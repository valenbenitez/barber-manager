'use client';
import {
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    setDoc,
    updateDoc,
    where,
} from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import React, { createContext, useContext, useState } from 'react';
import { User } from '../models/user';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { v4 as uuidv4 } from 'uuid';

const UserContext = createContext<any>({});

export const UserProvider = ({ children }) => {
    const user = useUserProvider();
    return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export const useUser = () => {
    return useContext(UserContext);
};

export const useUserProvider = () => {
    const [user, setUser] = useState<any>(null);

    const registerEmployee = async () => {
        createUserWithEmailAndPassword(auth, 'mariano@saltlight.com', 'mariano003')
            .then(async (userCredential) => {
                // El usuario se ha creado exitosamente
                const user = userCredential.user;
                console.log("Usuario registrado con éxito:", user);
                await createUser({
                    createdAt: new Date(),
                    id: user.uid,
                    name: 'Mariano',
                    phone: '0000000000',
                    role: 'employee',
                    type: 'barberia',
                    available: true,
                    email: 'mariano@saltlight.com'
                })
                // Aquí puedes redirigir al usuario o manejar sesiones
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error("Error al registrar el usuario:", errorCode, errorMessage);
                // Manejo de errores, como mostrar un mensaje en la UI
            });
    }

    const createUser = async (user: User) => {
        return setDoc(doc(db, 'users', user.id), user)
            .then(() => {
                console.log('Success');
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getUser = async (userId: string): Promise<User | null> => {
        return getDoc(doc(db, 'users', userId)).then((userData) => {
            if (userData.exists()) {
                const user = userData.data() as User;
                setUser(user);
                return user;
            } else {
                setUser(null);
                return null;
            }
        });
    };

    const getUserById = async (userId: string): Promise<User | null> => {
        return getDoc(doc(db, 'users', userId)).then((userData) => {
            if (userData.exists()) {
                const user = userData.data() as User;
                return user;
            } else {
                setUser(null);
                return null;
            }
        });
    };

    const getUsersByRole = async (): Promise<User[]> => {
        const users: User[] = [];
        const usersQuery = query(collection(db, 'users'), where('role', '==', 'client'));
        try {
            const querySnapshot = await getDocs(usersQuery);
            querySnapshot.forEach((doc) => {
                const userData = doc.data() as User;
                users.push(userData);
            });
        } catch (error) {
            console.error('Error fetching users:', error);
        }

        return users;
    };

    const filterCortes = async (barberId, filtroDia = false) => {
        const cortes: any = [];
        const q = query(collection(db, 'cortes'), where('status', '==', 'Terminado'), where('barberId', '==', barberId))
        try {
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                const orderData = doc.data();
                const createdAt = orderData.createdDate.toDate();
                if (filtroDia) {
                    const today = new Date();
                    if (createdAt.getDate() === today.getDate() &&
                        createdAt.getMonth() === today.getMonth() &&
                        createdAt.getFullYear() === today.getFullYear()) {
                        cortes.push(orderData);
                    }
                } else {
                    const currentMonth = new Date().getMonth();
                    if (
                        createdAt.getMonth() === currentMonth &&
                        createdAt.getFullYear() === new Date().getFullYear()
                    ) {
                        cortes.push(orderData);
                    }
                }
            })
        } catch (error) {
            console.error('Error fetching cortes:', error);
        }
        return cortes
    };

    const getPersonalByType = async (type: 'barberia' | 'peluqueria' | 'belleza' | 'none'): Promise<User[]> => {
        const users: User[] = [];
        const usersQuery = query(collection(db, 'users'), where('role', '==', 'employee'), where('type', '==', type));
        try {
            const querySnapshot = await getDocs(usersQuery);
            querySnapshot.forEach((doc) => {
                const userData = doc.data() as User;
                users.push(userData);
            });
        } catch (error) {
            console.error('Error fetching users:', error);
        }
        return users;
    };

    const disponibilityOfBarber = async (barberId): Promise<boolean> => {
        const cortes: any = [];
        const q = query(collection(db, 'cortes'), where('status', '==', 'En proceso'), where('barberId', '==', barberId))
        try {
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach(doc => {
                const orderData = doc.data();
                cortes.push(orderData);
            })
        } catch (error) {
            console.error('Error fetching cortes:', error);
        }
        if (cortes.length > 0) {
            return false
        } else {
            return true
        }
    }

    const getClients = async (): Promise<User[]> => {
        const users: User[] = [];
        const usersQuery = query(collection(db, 'users'), where('role', '==', 'client'));
        try {
            const querySnapshot = await getDocs(usersQuery);
            querySnapshot.forEach((doc) => {
                const userData = doc.data() as User;
                users.push(userData);
            });
        } catch (error) {
            console.error('Error fetching users:', error);
        }
        return users;
    };

    const updateUser = async (userId: string, data: User): Promise<void> => {
        console.log({ userId, data });
        const userRef = doc(db, 'users', userId);
        const userUpdated = await updateDoc(userRef, { ...data });
        const newUser = await getUserById(userId);
        setUser(newUser);
        console.log(newUser);
        return;
        // return updateDoc(userRef, { ...data });
    };

    const getUserByEmail = async (email: string): Promise<User | null> => {
        const usersCollection = collection(db, 'users');

        // Crear una consulta que busque usuarios con el campo "email" igual al correo proporcionado
        const q = query(usersCollection, where('email', '==', email));

        try {
            const querySnapshot = await getDocs(q);

            if (querySnapshot.size === 0) {
                // No se encontraron usuarios con ese correo electrónico
                return null;
            }

            // Devuelve el primer usuario encontrado (asumiendo que no debería haber más de uno)
            const userDoc = querySnapshot.docs[0];
            const user = userDoc.data() as User;

            return user;
        } catch (error) {
            console.error('Error al buscar usuario por correo electrónico:', error);
            return null;
        }
    };

    const isOwner = user?.role === 'owner';

    const addFieldToUsersCollection = async () => {
        const usersCollectionRef = collection(db, 'users');
        try {
            // Obtenemos todos los documentos de la coleccion
            const querySnapshot = await getDocs(usersCollectionRef);
            // Creo un array de promesas para las actualizaciones
            const updatePromises = querySnapshot.docs.map(async (doc) => {
                // Agrego el nuevo campo y valor al documento
                await updateDoc(doc.ref, { bankRecipients: [], walletRecipients: [] });
            });
            await Promise.all(updatePromises);
            console.log('Campos agregados con exito');
        } catch (error) {
            console.log('Error al agregar al campo:', error);
        }
    };

    return {
        user,
        setUser,
        getUser,
        getUserById,
        getUserByEmail,
        createUser,
        updateUser,
        isOwner,
        addFieldToUsersCollection,
        getUsersByRole,
        getPersonalByType,
        getClients,
        filterCortes,
        disponibilityOfBarber,
        registerEmployee
    };
};