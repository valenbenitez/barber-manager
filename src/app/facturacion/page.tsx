'use client'
import { useAuth } from '@/hooks/useAuth';
import { useUser } from '@/hooks/useUser';
import { CircularProgress } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import * as Styled from './style'

function page() {
    const [isLoading, setIsLoading] = useState(true);
    const { createUser, isOwner, getUser } = useUser();
    const { authState } = useAuth();
    const router = useRouter();

    useEffect(() => {
        fetchUser()
    }, [])

    const fetchUser = () => {
        getUser(authState?.user?.id).then((user) => {
            if (user?.role !== 'owner') {
                router.push('/dashboard')
            } else {
                setIsLoading(false)
            }
        })
    }

    if (isLoading) {
        return (
            <Styled.Container>
                <CircularProgress />
            </Styled.Container>
        )
    }

    return (
        <div>page</div>
    )
}

export default page