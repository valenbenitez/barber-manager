'use client';
import { createContext, useContext, useEffect, useReducer } from 'react';
import {
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signOut,
    User as FirebaseUser,
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '../config/firebase';
import { useUser } from './useUser';
import { User } from '../models/user';
import { useRouter } from 'next/navigation';
import {
    doc,
    getDoc,
    setDoc,
    query,
    where,
    collection,
    getDocs,
    orderBy,
    limit,
    updateDoc,
} from 'firebase/firestore';
import { db } from '../config/firebase';

const actions = {
    login: '[Auth] Login',
    logout: '[Auth] Logout',
};

const initialState = {
    logged: false,
};

const authReducer = (state, action) => {
    switch (action.type) {
        case actions.login:
            return {
                ...state,
                logged: true,
                user: action.payload,
            };
        case actions.logout:
            return {
                logged: false,
            };
        default:
            return state;
    }
};

const UserContext = createContext<any>({});

export const AuthProvider = ({ children }) => {
    const auth = useAuthProvider();
    return <UserContext.Provider value={auth}>{children}</UserContext.Provider>;
};

export const useAuth = () => {
    return useContext(UserContext);
};

const init = () => {
    if (typeof window !== 'undefined') {
        const user = JSON.parse(localStorage.getItem('@auth_data')!);
        return {
            logged: !!user,
            user,
        };
    }
};

export const useAuthProvider = () => {
    const [authState, dispatch] = useReducer(authReducer, initialState, init);
    const { createUser, getUser, mapFirebaseUserToUser } = useUser();
    const router = useRouter();

    // Función para validar si un número de teléfono está registrado
    async function validatePhone(phone: string) {
        try {
            const usuariosRef = collection(db, 'users');
            // Crear una consulta para buscar usuarios con el mismo número de teléfono
            const q = query(usuariosRef, where('phone', '==', phone));
            const querySnapshot = await getDocs(q);
            if (querySnapshot.size > 0) {
                // El número de teléfono ya está registrado
                return false;
            } else {
                // El número de teléfono no está registrado
                return true;
            }
        } catch (error) {
            console.error('Error al validar número de teléfono:', error);
            throw error;
        }
    }

    // Crear usuario con email y contraseña
    const signUpUserWithEmailAndPassword = async ({
        email,
        password,
        firstName,
        phone,
        countryCode,
        referrerId,
    }) => {
        return createUserWithEmailAndPassword(auth, email, password)
            .then(async (response) => {
                console.log(response);
                const userData: User = mapFirebaseUserToUser(
                    response.user,
                    firstName,
                    phone,
                    referrerId,
                );
                const userAction = {
                    id: userData.id,
                    email: userData.email,
                };
                await createUser(userData);
                dispatch({
                    type: actions.login,
                    payload: userAction,
                });
                localStorage.setItem('@auth_data', JSON.stringify(userAction));
            })
            .catch((error) => {
                if (error?.code === 'auth/email-already-in-use') {
                    return 'Correo ya registrado';
                }
                console.log(error);
                return { error };
            });
    };

    // Ingresar con usuario y contraseña
    const signInUserWithEmailAndPassword = async ({ email, password }) => {
        return signInWithEmailAndPassword(auth, email, password)
            .then(async (response) => {
                const user = { id: response.user.uid, email: response.user.email };
                dispatch({
                    type: actions.login,
                    payload: user,
                });
                localStorage.setItem('@auth_data', JSON.stringify(user));
            })
            .catch((error) => {
                console.log(error);
                return { error };
            });
    };

    // Crear usuario o ingresar con cuenta de Google
    const signInUserWithGoogle = async (referrerId = '') => {
        const googleProvider = new GoogleAuthProvider();
        return signInWithPopup(auth, googleProvider).then(async (response) => {
            const userAction = { id: response.user.uid, email: response.user.email };
            dispatch({
                type: actions.login,
                payload: userAction,
            });
            const currentUser = await getUser(response.user.uid);
            if (!currentUser) {
                const mapUser = mapFirebaseUserToUser(
                    response.user,
                    '',
                    '',
                    referrerId,
                );
                await createUser(mapUser);
            }
            localStorage.setItem('@auth_data', JSON.stringify(userAction));
        });
    };

    // Logout
    const signOutUser = () => {
        signOut(auth);
        dispatch({ type: actions.logout });
        localStorage.removeItem('@auth_data');
        localStorage.clear();
        router.push('/');
    };

    const sendUserPasswordResetEmail = async (email: string) => {
        const response = await sendPasswordResetEmail(auth, email);
        return response;
    };

    const handleAuthStateChanged = (currentUser: FirebaseUser | null) => {
        localStorage.setItem(
            '@auth_data',
            JSON.stringify(
                currentUser ? { id: currentUser.uid, email: currentUser.email } : '',
            ),
        );
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, handleAuthStateChanged);

        return () => unsubscribe();
    }, []);

    return {
        authState,
        signUpUserWithEmailAndPassword,
        signInUserWithEmailAndPassword,
        signOutUser,
        sendUserPasswordResetEmail,
        signInUserWithGoogle,
        validatePhone
    };
};
