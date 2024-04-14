"use client"
import React, { useEffect, useState } from 'react'
import * as Styled from './style'
import { useUser } from '@/hooks/useUser'
import ClientList from '@/components/ClientList/ClientList'

function Clientes() {
    const [clients, setClients] = useState([])
    const { getClients } = useUser()

    useEffect(() => {
        fetchClients()
    }, [])

    const fetchClients = async () => {
        const clients = await getClients()
        setClients(clients)
    }

    return (
        <>
            <Styled.Container>
                <Styled.ItemContainer>
                    <Styled.StartContainer>
                        <Styled.Title>Clientes</Styled.Title>
                    </Styled.StartContainer>
                    <ClientList clients={clients} />
                </Styled.ItemContainer>
            </Styled.Container>
        </>
    )
}

export default Clientes