'use client'
import React from 'react'
import * as Styled from './style'
import { useUser } from '@/hooks/useUser'
import ShavesByBarber from '@/components/ShavesByBarber/ShavesByBarber'

export default function BarberView() {
    const { user } = useUser();
    return (
        <>
            <Styled.Content>
                <Styled.StartContainer>
                    <Styled.Label>Hola {user?.name}</Styled.Label>
                    <br /><br />
                </Styled.StartContainer>
                <Styled.ItemContainer>
                    <Styled.StartContainer>
                        <Styled.Label>Cortes en proceso:</Styled.Label>
                    </Styled.StartContainer>
                    <ShavesByBarber status='En proceso' barberId={user?.id} type={user?.type} />
                    <Styled.StartContainer>
                        <Styled.Label>Cortes en espera:</Styled.Label>
                    </Styled.StartContainer>
                    <ShavesByBarber status='En espera' barberId={user?.id} type={user?.type} />
                    <label>Servicio: {user?.type}</label>
                </Styled.ItemContainer>
            </Styled.Content>
        </>
    )
}
