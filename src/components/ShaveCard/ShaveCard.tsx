import React, { useEffect, useState } from 'react';
import * as Styled from './style';
import DataTable from 'react-data-table-component';
import { useCortes } from '@/hooks/useCortes';

function formatSecondsAndNanosecondsToDate(seconds, nanoseconds) {
    const milliseconds = Math.floor(nanoseconds / 1e6); // Convertir nanosegundos a milisegundos
    const date = new Date(seconds * 1000 + milliseconds);
    return date.toLocaleString(); // Puedes utilizar otras opciones de formato según tus necesidades
}

// A super simple expandable component.
const ExpandedComponent = ({ data }) => {
    const [amount, setAmount] = useState(0)
    const { updateCorte } = useCortes();

    async function handleCorteInProcess() {
        await updateCorte(data.id, { status: 'En proceso' })
    }

    async function handleFinally() {
        setAmount(0)
        await updateCorte(data.id, { completedDate: new Date(), status: 'Terminado', price: amount })
    }

    function handleChange(event) {
        setAmount(event?.target?.value)
    }

    return (
        <>
            <Styled.StartContainer>
                <pre>{JSON.stringify(data.id, null, 2)}</pre>
                <button onClick={handleCorteInProcess}>En proceso</button>
                <input type='number' placeholder='Precio final cobrado al cliente' onChange={handleChange} value={amount}></input>
                <button onClick={handleFinally} >Finalizar y cobrar</button>
            </Styled.StartContainer>
        </>
    )
}

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
];

function ShaveCard() {
    const [cortes, setCortes] = useState([]);
    const { getCortes } = useCortes();

    useEffect(() => {
        fetchCortes()
    }, [cortes])

    const fetchCortes = async () => {
        //TO DO: OMITIR LOS CORTES TERMINADOS
        const cortes = await getCortes();
        setCortes(cortes)
    }

    return (
        <DataTable
            columns={columns}
            data={cortes}
            expandableRows
            expandableRowsComponent={ExpandedComponent}
        />
    )
}

export default ShaveCard