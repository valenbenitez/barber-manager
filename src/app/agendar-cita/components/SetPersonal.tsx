import { useUser } from '@/hooks/useUser';
import { User } from '@/models/user';
import React, { useEffect, useState } from 'react'
import * as Styled from './style'
import { Button, Spin } from 'antd';

interface SetPersonalProps {
    serviceType: string;
    setScreen: any;
    barberSelected: any;
    setBarberSelected: any;
}

export default function SetPersonal({ barberSelected, serviceType, setBarberSelected, setScreen }: SetPersonalProps) {
    const [loading, setLoading] = useState(true);
    const [personalBarberia, setPersonalBarberia] = useState<User[]>([])
    const [personalPeluqueria, setPersonalPeluqueria] = useState<User[]>([])
    const [personalBelleza, setPersonalBelleza] = useState<User[]>([])
    const { createUser, getPersonalByType, getUserById } = useUser();
    const [type, setType] = useState(serviceType)
    const personal = {
        barberia: personalBarberia,
        peluqueria: personalPeluqueria,
        belleza: personalBelleza
    }[type]

    useEffect(() => {
        fetchBarbers().then(() => setLoading(false))
    }, [])

    const fetchBarbers = async () => {
        const barbers = await getPersonalByType('barberia')
        const personalPeluqueria = await getPersonalByType('peluqueria')
        const personalBelleza = await getPersonalByType('belleza')
        setPersonalBarberia(barbers)
        setPersonalPeluqueria(personalPeluqueria)
        setPersonalBelleza(personalBelleza)
    };

    const handleChangeBarber = async (event) => {
        const value = event.target.value;
        if (value === '') {
            return;
        }
        setLoading(true)
        const barberSelectedData = await getUserById(value)
        setBarberSelected(barberSelectedData)
        setLoading(false)
    };

    const handleSubmit = () => {
        //TODO: CAMBIAR SCREEN SEGUN EL serviceType
        setScreen('barberiaAppointment')
    }

    return (
        <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            <Styled.FormSelect onChange={handleChangeBarber}>
                <Styled.Option>Seleccionar {`personal de ${type}`}</Styled.Option>
                {personal?.length && personal.map(barber => (
                    <Styled.Option value={barber.id} key={barber.phone}>{barber.name}</Styled.Option>
                ))}
                <Styled.Option value={''}>Sin preferencia</Styled.Option>
            </Styled.FormSelect>
            <br />
            <Button type='primary' onClick={handleSubmit} disabled={loading ? true : false}>
                {loading ? 'Cargando...' : 'Confirmar'}
            </Button>
        </div>
    )
}

const centerContainer: any = { display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }
