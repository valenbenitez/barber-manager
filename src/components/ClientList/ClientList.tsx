import React, { useEffect, useState } from 'react';
import * as Styled from './style';
import DataTable from 'react-data-table-component';
import { useCortes } from '@/hooks/useCortes';
import SimpleSnackbar from '../SimpleSnackbar/SimpleSnackbar';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@mui/material';

function formatSecondsAndNanosecondsToDate(seconds, nanoseconds) {
    const milliseconds = Math.floor(nanoseconds / 1e6); // Convertir nanosegundos a milisegundos
    const date = new Date(seconds * 1000 + milliseconds);
    return date.toLocaleString(); // Puedes utilizar otras opciones de formato según tus necesidades
}



export default function ClientList({ clients }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredCustomers, setFilteredCustomers] = useState(clients);
    const router = useRouter();

    useEffect(() => {
        setFilteredCustomers(clients)
    }, [clients])

    const handleButtonClick = (e, id) => {
        e.preventDefault();
        router.push(`/dashboard/registrar-corte/${id}`)
    };

    const columns = [
        {
            name: 'Nombre',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Registrado',
            selector: row => formatSecondsAndNanosecondsToDate(row.createdAt?.seconds, row.createdAt?.nanoseconds),
        },
        {
            name: 'Celular',
            selector: row => row.phone,
        },
        {
            name: 'id',
            selector: row => row.id,
        },
        {
            name: 'Actions',
            selector: row => row.id,
            button: true,
            cell: (row) => (
                <Button
                    variant='contained'
                    color='warning'
                    className="btn btn-outline btn-xs"
                    onClick={(e) => handleButtonClick(e, row.id)}
                >
                    Nuevo corte
                </Button>
            ),
        }
    ];

    const handleSearchInputChange = (event) => {
        const text = event.target.value;
        setSearchQuery(text);
        const filtered = text === "" ? clients : clients.filter(
            (customer) =>
                customer.name.toLowerCase().includes(text.toLowerCase())
            // customer.address.toLowerCase().includes(text.toLowerCase()) ||
            // customer.mobileno.includes(text) ||
            // customer.plateno.includes(text)
        );
        setFilteredCustomers(filtered);
    };

    return (
        <>
            <Styled.InputLogin
                placeholder="Buscar por nombre"
                onChange={handleSearchInputChange}
                value={searchQuery}
            />
            <Link href={'/dashboard/registrar-corte'}>
                <Button variant='contained' color='success'>Cliente nuevo</Button>
            </Link>
            <DataTable
                columns={columns}
                data={filteredCustomers}
                fixedHeader
                fixedHeaderScrollHeight="800px"
            />
        </>
    );
};