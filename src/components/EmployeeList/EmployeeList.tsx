import React, { useEffect, useState } from 'react'
import * as Styled from './style'
import { useUser } from '@/hooks/useUser';
import DataTable from 'react-data-table-component';

function formatSecondsAndNanosecondsToDate(seconds, nanoseconds) {
    const milliseconds = Math.floor(nanoseconds / 1e6); // Convertir nanosegundos a milisegundos
    const date = new Date(seconds * 1000 + milliseconds);
    return date.toLocaleString(); // Puedes utilizar otras opciones de formato según tus necesidades
}

export default function EmployeeList({ userType }: { userType: 'barberia' | 'peluqueria' | 'belleza' | 'none' }) {
    const [users, setUsers] = useState([])
    const { getPersonalByType } = useUser();
    const columns = [
        {
            name: 'Nombre',
            selector: row => row.name,
        },
        {
            name: 'Celular',
            selector: row => row.phone,
        },
        {
            name: 'Servicio',
            selector: row => row.type,
        },
        {
            name: 'Disponible',
            selector: row => row?.available ? 'Si' : 'No',
        },
    ]

    useEffect(() => {
        fetchPersonal()
    }, [userType])

    const fetchPersonal = () => {
        getPersonalByType(userType).then((result) => setUsers(result))
    }

    return (
        <DataTable
            columns={columns}
            data={users}
            noDataComponent={<label style={{ padding: '14px' }}>Sin usuarios</label>}
            fixedHeader
            fixedHeaderScrollHeight="800px"
        />
    )
}
