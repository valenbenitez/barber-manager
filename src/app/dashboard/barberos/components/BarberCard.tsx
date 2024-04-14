'use client'
import React, { useEffect, useState } from 'react'
import * as Styled from '../style'
import { User } from '@/models/user';
import { useUser } from '@/hooks/useUser';
import { Button } from '@mui/material';

export default function BarberCard({ barber }: { barber: User | any }) {
    const [cortesByDay, setCortesByDay] = useState([])
    const [cortesByMonth, setCortesByMonth] = useState([])
    const { filterCortes } = useUser();

    useEffect(() => {
        fetchFilterCortes()
    }, [])

    function formatSecondsAndNanosecondsToDate(seconds, nanoseconds) {
        const milliseconds = Math.floor(nanoseconds / 1e6); // Convertir nanosegundos a milisegundos
        const date = new Date(seconds * 1000 + milliseconds);
        const dateFormated = date.toLocaleDateString().split(',')[0]
        return dateFormated //EJEMPLO: 2/3/2024
        // return date.toLocaleString(); // EJEMPLO: 2/3/2024, 12:58
    }

    async function fetchFilterCortes() {
        const byDay = await filterCortes(barber.id, true)
        const byMonth = await filterCortes(barber.id, false)
        setCortesByDay(byDay)
        setCortesByMonth(byMonth)
        return
    }

    return (
        <>
            <Styled.BarberCard key={barber.id}>
                <Styled.CenterContainer>
                    <Styled.BetweenContainer>
                        <Styled.Label>Nombre:</Styled.Label>
                        <label>{barber.name}</label>
                    </Styled.BetweenContainer>
                    <Styled.Line />
                    <Styled.BetweenContainer>
                        <Styled.Label>Celular:</Styled.Label>
                        <label>{barber.phone}</label>
                    </Styled.BetweenContainer>
                    <Styled.Line />
                    <Styled.BetweenContainer>
                        <Styled.Label>Registrado:</Styled.Label>
                        <label>{formatSecondsAndNanosecondsToDate(barber.createdAt?.seconds, barber.createdAt?.nanoseconds)}</label>
                    </Styled.BetweenContainer>
                    <Styled.Line />
                    <Styled.BetweenContainer>
                        <Styled.Label>Cortes del mes:</Styled.Label>
                        <label>{cortesByMonth?.length}</label>
                    </Styled.BetweenContainer>
                    <Styled.Line />
                    <Styled.BetweenContainer>
                        <Styled.Label>Cortes del dia:</Styled.Label>
                        <label>{cortesByDay?.length}</label>
                    </Styled.BetweenContainer>
                    <Styled.Line />
                    <Styled.BetweenContainer>
                        <Styled.Label>Productos vendidos:</Styled.Label>
                        <label>{cortesByDay?.length}</label>
                    </Styled.BetweenContainer>
                    <Styled.Line />
                </Styled.CenterContainer>
                <br />
                <Styled.EndContainer>
                    <Button variant='contained' color='error'>Ver informacion de cortes</Button>
                </Styled.EndContainer>
            </Styled.BarberCard>
        </>
    )
}
