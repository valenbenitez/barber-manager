import React, { useEffect, useState } from 'react';
import * as Styled from './style';
import DataTable from 'react-data-table-component';
import { useCortes } from '@/hooks/useCortes';
import SimpleSnackbar from '../SimpleSnackbar/SimpleSnackbar';
import { Button, TextField } from '@mui/material';
import { useCortesRealTime } from '@/hooks/useCortesRealTime';

function formatSecondsAndNanosecondsToDate(seconds, nanoseconds) {
    const milliseconds = Math.floor(nanoseconds / 1e6); // Convertir nanosegundos a milisegundos
    const date = new Date(seconds * 1000 + milliseconds);
    return date.toLocaleString(); // Puedes utilizar otras opciones de formato según tus necesidades
}

// A super simple expandable component.
const ExpandedComponent = ({ data, fetchCortes }) => {
    const [amount, setAmount] = useState(0)
    const [error, setError] = useState(false)
    const { updateCorte, deleteCorte } = useCortes();

    async function handleCorteInProcess() {
        const newCortes = await updateCorte(data.id, { status: 'En proceso' })
        await fetchCortes(newCortes);
    }

    async function handleFinally() {
        if (amount === 0 || !amount) {
            setError(true)
        } else {
            setAmount(0)
            const newCortes = await updateCorte(data.id, { status: 'Terminado', price: amount })
            await fetchCortes(newCortes)
        }
    }

    function handleChange(event) {
        setAmount(event?.target?.value)
    }

    return (
        <>
            {data?.status === 'En proceso' || data?.status === 'En espera' ? (
                <Styled.StartContainer>
                    {data?.status === 'En espera' && <Button variant='contained' onClick={handleCorteInProcess}>En proceso</Button>}
                    {data?.status === 'En proceso' && <TextField sx={{ outlined: 'none' }} variant='outlined' type='number' placeholder='Precio final cobrado al cliente' onChange={handleChange} value={amount}></TextField>}
                    {data?.status === 'En proceso' && <Button variant='contained' color='warning' onClick={handleFinally} >Finalizar y cobrar</Button>}
                </Styled.StartContainer>
            ) : (
                <Styled.StartContainer>
                    <label>Precio cobrado: ${data?.price}</label> <br />
                    <label>Contacto cliente: {data?.clientPhone}</label>
                </Styled.StartContainer>
            )}

            <SimpleSnackbar open={error} setOpen={setError} severity='error' title='Porfavor introduce el monto cobrado' key={data.id} />
        </>
    )
}

interface ShaveCardProps {
    status: 'Terminado' | 'En proceso' | 'En espera'
    type?: 'barberia' | 'peluqueria' | 'belleza'
}

function ShaveCard({ status, type = 'barberia' }: ShaveCardProps) {
    const [updateCortes, setUpdateCortes] = useState(false);
    const [cortes, setCortes] = useState([]);
    const { getCortes, deleteCorte } = useCortes();
    const { cortesEnEsperaRealTime, cortesEnProcesoRealTime, cortesTerminadosRealTime } = useCortesRealTime(type);
    const [firstTime, setFirstTime] = useState(true)
    const columns = [
        {
            name: 'Cliente',
            selector: row => row.clientName,
        },
        {
            name: 'Barbero',
            selector: row => row.barberName,
        },
        {
            name: 'Estado',
            selector: row => row.status,
        },
        {
            name: 'Registrado',
            selector: row => formatSecondsAndNanosecondsToDate(row.createdDate?.seconds, row.createdDate?.nanoseconds),
        },
        {
            name: 'Cobrar',
            selector: row => row?.toCollect ? 'Si' : 'No',
        },
        {
            name: 'Action',
            selector: row => row?.status !== 'Terminado' && <Button onClick={() => deleteCorte(row.id)} >Eliminar corte</Button>,
        },
    ];

    useEffect(() => {
        fetchCortes();
    }, [updateCortes])

    const fetchCortes = async () => {
        //TO DO: OMITIR LOS CORTES TERMINADOS
        const cortes = await getCortes(type);
        const filteredCortes = cortes.filter(corte => corte.status === status)
        setCortes(filteredCortes)
        setFirstTime(false)
    }

    const components = {
        'En espera': cortesEnEsperaRealTime,
        'En proceso': cortesEnProcesoRealTime,
        'Terminado': cortesTerminadosRealTime,
    }

    return (
        <DataTable
            columns={columns}
            data={components[status]}
            noDataComponent={<label style={{ padding: '14px' }}>Sin cortes</label>}
            expandableRows
            expandableRowsComponent={({ data }) => <ExpandedComponent data={data} fetchCortes={fetchCortes} />}
            pagination
            fixedHeader
            fixedHeaderScrollHeight="800px"
        />
    )
}

export default ShaveCard