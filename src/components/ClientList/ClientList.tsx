import React, { useEffect, useState } from 'react';
import * as Styled from './style';
import DataTable from 'react-data-table-component';
import { useCortes } from '@/hooks/useCortes';
import SimpleSnackbar from '../SimpleSnackbar/SimpleSnackbar';

function formatSecondsAndNanosecondsToDate(seconds, nanoseconds) {
    const milliseconds = Math.floor(nanoseconds / 1e6); // Convertir nanosegundos a milisegundos
    const date = new Date(seconds * 1000 + milliseconds);
    return date.toLocaleString(); // Puedes utilizar otras opciones de formato según tus necesidades
}

const columns = [
    {
        name: 'Nombre',
        selector: row => row.name,
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
];

export default function ClientList({ clients }) {
    console.log(clients)
    return (
        <DataTable
            columns={columns}
            data={clients}
        />
    );
};