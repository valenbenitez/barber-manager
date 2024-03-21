'use client';
import { useRouter } from 'next/navigation';
import { useAuth } from '../hooks/useAuth';
import { useEffect } from 'react';
import { NoSsr } from '@mui/material';
import { useUser } from '../hooks/useUser';

const withAuth = (WrappedComponent) => {
    const Auth = (props) => {
        const router = useRouter();
        const { authState } = useAuth();
        const { user, getUser } = useUser();

        useEffect(() => {
            if (!authState?.logged) {
                // Si el usuario no está logueado, redirige a la página de inicio de sesión
                router.push('/');
            } else {
                if (!user) {
                    getUser(authState?.user.id);
                }
            }
        }, [authState, router]);

        return (
            <NoSsr>
                {authState?.logged ? <WrappedComponent {...props} /> : null}
            </NoSsr>
        );
    };

    return Auth;
};

export default withAuth;
