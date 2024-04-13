'use client'
import React from 'react'
import * as Styled from './style'
import NavBar from '@/components/NavBar/NavBar'
import { useUser } from '@/hooks/useUser'
import ShavesByBarber from '@/components/ShavesByBarber/ShavesByBarber'

export default function BarberView() {
    const { user } = useUser();
    return (
        <>
            <Styled.Content>
                <Styled.StartContainer>
                    <Styled.Label>Hola {user?.name}</Styled.Label>
                </Styled.StartContainer>
                <Styled.ItemContainer>
                    <Styled.StartContainer>
                        <Styled.Label>Cortes en proceso:</Styled.Label>
                    </Styled.StartContainer>
                    <ShavesByBarber status='En proceso' barberId={user?.id} />
                    <Styled.StartContainer>
                        <Styled.Label>Cortes en espera:</Styled.Label>
                    </Styled.StartContainer>
                    <ShavesByBarber status='En espera' barberId={user?.id} />
                </Styled.ItemContainer>
            </Styled.Content>
            <NavBar />
        </>
    )
}
