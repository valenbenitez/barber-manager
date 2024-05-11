import React, { useState } from 'react'
import BarberStatus from '@/components/BarberStatus/BarberStatus'
import { Button, ButtonGroup, Fab } from "@mui/material";
import EmployeeList from '@/components/EmployeeList/EmployeeList';


export default function EmployeesInfo() {
    const [type, setType] = useState<'barberia' | 'peluqueria' | 'belleza' | 'none'>('barberia')

    function handleStatus(status: 'barberia' | 'peluqueria' | 'belleza' | 'none') {
        setType(status)
    }

    return (
        <>
            <label><b>Disponibilidad de empleados</b></label>
            <div style={{ display: 'flex', padding: '2px', gap: '10px', backgroundColor: '#fff', borderRadius: '12px' }} >
                <Button style={{ borderRadius: '12px' }} size='small' onClick={() => handleStatus('barberia')} variant="contained" color="primary" disabled={type === 'barberia' ? true : false}>Barberos</Button>
                <Button style={{ borderRadius: '12px' }} size='small' onClick={() => handleStatus('peluqueria')} variant="contained" color="primary" disabled={type === 'peluqueria' ? true : false}>Peluqueras</Button>
                <Button style={{ borderRadius: '12px' }} size='small' onClick={() => handleStatus('belleza')} variant="contained" color="primary" disabled={type === 'belleza' ? true : false}>Belleza</Button>
            </div>
            <EmployeeList userType={type} />
        </>
    )
}
