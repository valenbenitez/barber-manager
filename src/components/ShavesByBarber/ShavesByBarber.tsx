import React, { useEffect, useState } from 'react';
import * as Styled from './style';
import DataTable from 'react-data-table-component';
import { useCortes } from '@/hooks/useCortes';
import SimpleSnackbar from '../SimpleSnackbar/SimpleSnackbar';
import { Button } from '@mui/material';
import { useUser } from '@/hooks/useUser';
import { useCortesRealTime } from '@/hooks/useCortesRealTime';

const columns = [
    {
        name: 'Cliente',
        selector: row => row.clientName,
    },
    {
        name: 'Estado',
        selector: row => row.status,
    },
    {
        name: 'Barbero',
        selector: row => row.barberName,
    },
];

interface ShaveCardProps {
    status: 'Terminado' | 'En proceso' | 'En espera';
    barberId: string;
    type: 'barberia' | 'peluqueria' | 'belleza';
}

// A super simple expandable component.
const ExpandedComponent = ({ data, fetchCortes }) => {
    const [amount, setAmount] = useState(0)
    const [error, setError] = useState(false)
    const { updateCorte, getCortes } = useCortes();
    const { user, updateUser } = useUser();

    async function handleCorteInProcess() {
        const updateData = data.barberId === '' ? { status: 'En proceso', barberId: user?.id, barberName: user?.name } : { status: 'En proceso' }
        await updateUser(user?.id, { available: false })
        const newCortes = await updateCorte(data.id, updateData)
        await fetchCortes(newCortes);
    }

    // ESTA FUNCION DEBE MARCAR EL COMPLETED DATE PERO SIN CAMBIAR EL STATUS YA QUE FALTA FACTURARLO
    async function handleBarberFinally() {
        const newCortes = await updateCorte(data.id, { completedDate: new Date(), toCollect: true })
        await updateUser(user?.id, { available: true })
        await fetchCortes(newCortes)
    }

    //ESTA FUNCION DEBE ASIGNAR EL BARBERO AL CORTE

    return (
        <>
            {data?.status === 'En proceso' || data?.status === 'En espera' ? (
                <Styled.StartContainer>
                    {data?.status === 'En espera' && <Button variant='contained' color='warning' onClick={handleCorteInProcess}>Asignarme</Button>}
                    {data?.status === 'En proceso' && <Button variant='contained' color='warning' onClick={handleBarberFinally}>Corte terminado</Button>}
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

function ShavesByBarber({ status, barberId, type }: ShaveCardProps) {
    const [updateCortes, setUpdateCortes] = useState(false);
    const [cortesFiltered, setCortes] = useState([]);
    const { getCortes } = useCortes();
    const [firstTime, setFirstTime] = useState(true)
    const { cortesEnEsperaRealTime, cortesEnProcesoRealTime, cortesTerminadosRealTime } = useCortesRealTime(type);

    useEffect(() => {
        fetchCortes();
    }, [updateCortes])

    const fetchCortes = async (cortesUpdated: any = []) => {
        //TO DO: OMITIR LOS CORTES TERMINADOS
        if (cortesUpdated.length > 0) {
            let filteredCortes = cortesUpdated.filter(corte => corte.status === status)
            if (status === 'En proceso') {
                filteredCortes = filteredCortes.filter(corte => corte.barberId === barberId)
            }
            setCortes(filteredCortes)
            setFirstTime(false)
        } else {
            const cortes = await getCortes();
            let filteredCortes = cortes.filter(corte => corte.status === status)
            if (status === 'En proceso') {
                filteredCortes = filteredCortes.filter(corte => corte.barberId === barberId)
            }
            setCortes(filteredCortes)
            setFirstTime(false)
        }
    }

    const components = {
        'En espera': cortesEnEsperaRealTime,
        'En proceso': cortesEnProcesoRealTime,
        'Terminados': cortesTerminadosRealTime,
    }

    return (
        <DataTable
            columns={columns}
            data={components[status]}
            expandableRows
            expandableRowsComponent={({ data }) => <ExpandedComponent data={data} fetchCortes={fetchCortes} />}
            fixedHeader
            fixedHeaderScrollHeight="800px"
        />
    )
}

export default ShavesByBarber
