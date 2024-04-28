'use client'
import React, { useEffect, useState } from 'react'
import * as Styled from './style'
import { useUser } from '@/hooks/useUser'
import { Button, CircularProgress } from '@mui/material'
import BarberCard from './components/BarberCard'
import Link from 'next/link'

export default function Barbers() {
    const [barbers, setBarbers] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const { getPersonalByType, filterCortes } = useUser();

    useEffect(() => {
        setIsLoading(true)
        getPersonalByType('barberia').then(result => {
            setBarbers(result)
            setIsLoading(false)
        })
    }, [])

    if (isLoading) {
        return (
            <Styled.Container>
                <Styled.Content>
                    <Styled.ItemContainer>
                        <CircularProgress />
                    </Styled.ItemContainer>
                </Styled.Content>
            </Styled.Container>
        )
    }

    return (
        <Styled.Container>
            <Styled.Content>
                <Styled.ItemContainer>
                    <Styled.EndContainer>
                        <Link href={'/dashboard/registrar-barbero'} >
                            <Button variant='contained' color='warning'>Registrar barbero</Button>
                        </Link>
                    </Styled.EndContainer>
                    {barbers.length > 0 && barbers.map((barber: any) => (
                        <BarberCard key={barber.id} barber={barber} />
                    ))}
                </Styled.ItemContainer>
            </Styled.Content>
            <br /><br /><br /><br />
        </Styled.Container>
    )
}
