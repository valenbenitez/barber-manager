import React, { useState } from 'react'
import ShaveCard from '@/components/ShaveCard/ShaveCard'
import { Button, ButtonGroup, Fab } from "@mui/material";


export default function PeluqueriaInfo() {
    const [status, setStatus] = useState<'En espera' | 'En proceso' | 'Terminado'>('En espera')

    function handleStatus(status: 'En espera' | 'En proceso' | 'Terminado') {
        setStatus(status)
    }

    return (
        <>
            <ButtonGroup style={{ padding: '10px', gap: '10px', backgroundColor: '#fff', borderRadius: '12px' }} size="large">
                <Button style={{ borderRadius: '12px' }} onClick={() => handleStatus('En espera')} variant="contained" color="primary" disabled={status === 'En espera' ? true : false}>En espera</Button>
                <Button style={{ borderRadius: '12px' }} onClick={() => handleStatus('En proceso')} variant="contained" color="primary" disabled={status === 'En proceso' ? true : false}>En proceso</Button>
                <Button style={{ borderRadius: '12px' }} onClick={() => handleStatus('Terminado')} variant="contained" color="primary" disabled={status === 'Terminado' ? true : false}>Terminado</Button>
            </ButtonGroup>
            <ShaveCard status={status} type='peluqueria' />
        </>
    )
}
