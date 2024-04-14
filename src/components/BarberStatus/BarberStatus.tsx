'use client'
import React, { useEffect, useState } from 'react'
import * as Styled from './style'
import { useUser } from '@/hooks/useUser'
import DataTable from 'react-data-table-component';
import { Button } from '@mui/material';

const ExpandedComponent = ({ data }) => {
    return (
        <>
            <Styled.StartContainer>
                <Button>Descanso</Button>
            </Styled.StartContainer>
        </>
    )
}

const columns = (disponibilityOfBarber) => [
    {
        name: 'Nombre',
        selector: row => row.name,
    },
    {
        name: 'Disponible',
        cell: row => {
            // Llama a disponibilityOfBarber de manera síncrona
            const result = disponibilityOfBarber(row.id);
            return result ? 'Disponible' : 'No disponible';
        },
    },
];


export default function BarberStatus() {
    const [barbers, setBarbers] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const { getBarbers, disponibilityOfBarber } = useUser()

    useEffect(() => {
        setIsLoading(true)
        getBarbers().then(result => {
            setBarbers(result)
            setIsLoading(false)
        })
    }, [])

    const tableColumns = columns(disponibilityOfBarber);

    return (
        <DataTable
            columns={tableColumns}
            data={barbers}
            expandableRows
            expandableRowsComponent={ExpandedComponent}
            pagination
            fixedHeader
            fixedHeaderScrollHeight="800px"
        />
    )
}
