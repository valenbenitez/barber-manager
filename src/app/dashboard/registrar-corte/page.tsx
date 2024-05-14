"use client";
import React, { useEffect, useState } from "react";
import * as Styled from "./style";
import { useUser } from "@/hooks/useUser";
import { v4 as uuidv4 } from 'uuid';
import SimpleSnackbar from "@/components/SimpleSnackbar/SimpleSnackbar";
import { User } from "@/models/user";
import { useCortes } from "@/hooks/useCortes";
import { initialNewClient, barberExtras, barberServices, bellezaExtras, bellezaServices, peluqueriaExtras, peluqueriaServices } from "./constants";
import { useParams } from 'next/navigation'
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

export default function RegistrarCorte() {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [newClient, setNewClient] = useState(initialNewClient);
    const [personalBarberia, setPersonalBarberia] = useState<User[]>([])
    const [personalPeluqueria, setPersonalPeluqueria] = useState<User[]>([])
    const [personalBelleza, setPersonalBelleza] = useState<User[]>([])
    const [service, setService] = useState('barberia')
    const [type, setType] = useState<'barberia' | 'peluqueria' | 'belleza'>('barberia')
    const [extrasSelected, setExtrasSelected] = useState<any>([])
    const [barberSelected, setBarberSelected] = useState<User[]>([])
    const { createUser, getPersonalByType, getUserById } = useUser();
    const { createCorte } = useCortes();
    const params = useParams()
    const personal = {
        barberia: personalBarberia,
        peluqueria: personalPeluqueria,
        belleza: personalBelleza
    }[type]
    const servicesArray = {
        barberia: barberServices,
        peluqueria: peluqueriaServices,
        belleza: bellezaServices,
    }[type]
    const extrasArray = {
        barberia: barberExtras,
        peluqueria: peluqueriaExtras,
        belleza: bellezaExtras,
    }[type]

    useEffect(() => {
        console.log(params)
        fetchBarbers()
    }, [])

    const handleChange = (event) => {
        setNewClient({
            ...newClient,
            [event.target.name]: event.target.value,
        });
    };

    const handleChangeBarber = (event) => {
        setBarberSelected(event.target.value)
    };

    const handleChangeServices = (event) => {
        setService(event.target.value)
    };

    const handleChangeExtras = (event) => {
        setExtrasSelected([...extrasSelected, event.target.value])
    };

    const fetchBarbers = async () => {
        const barbers = await getPersonalByType('barberia')
        const personalPeluqueria = await getPersonalByType('peluqueria')
        const personalBelleza = await getPersonalByType('belleza')
        setPersonalBarberia(barbers)
        setPersonalPeluqueria(personalPeluqueria)
        setPersonalBelleza(personalBelleza)
    };

    const handleRemoveExtra = (extra: string) => {
        const filteredExtras = extrasSelected.filter(ex => ex !== extra)
        setExtrasSelected(filteredExtras)
    }

    const handleServiceChange = (service: 'barberia' | 'peluqueria' | 'belleza') => {
        setType(service);
    };

    const handleSubmit = async () => {
        const barberSelectedData = barberSelected?.length > 0 ? await getUserById(barberSelected) : false
        const id = uuidv4();
        const corteId = uuidv4();
        const newUser = await createUser({
            createdAt: new Date(),
            role: 'client',
            type: 'none',
            name: newClient.name,
            phone: newClient.phone,
            id: id,
            email: '',
        })
        const newCorte = await createCorte({
            barberName: barberSelectedData?.name || '',
            barberId: barberSelectedData?.id || '',
            createdDate: new Date(),
            id: corteId,
            price: 0,
            status: 'En espera',
            clientName: newClient.name,
            clientPhone: newClient.phone,
            service: service,
            extras: extrasSelected,
            type: type
        })
        setNewClient(initialNewClient)
        setOpenSnackbar(true)
        return newUser
    }
    return (
        <>
            <Styled.Container>
                <Styled.ColumnContainer>
                    <Styled.ItemContainer>
                        <Styled.Title>Registrar corte</Styled.Title>
                        <ButtonGroup style={{ padding: '10px', gap: '10px', backgroundColor: '#fff' }} size="large">
                            <Button onClick={() => handleServiceChange('barberia')} variant="contained" color="primary" disabled={type === 'barberia' ? true : false}>BARBERIA</Button>
                            <Button onClick={() => handleServiceChange('peluqueria')} variant="contained" color="warning" disabled={type === 'peluqueria' ? true : false}>PELUQUERIA</Button>
                            <Button onClick={() => handleServiceChange('belleza')} variant="contained" color="secondary" disabled={type === 'belleza' ? true : false}>BELLEZA</Button>
                        </ButtonGroup>
                        <Styled.FormSelect onChange={handleChangeBarber}>
                            <Styled.Option>Seleccionar {`personal de ${type}`}</Styled.Option>
                            {personal?.length && personal.map(barber => (
                                <Styled.Option value={barber.id} key={barber.phone}>{barber.name}</Styled.Option>
                            ))}
                        </Styled.FormSelect>
                        <Styled.BetweenContainer>
                            <Styled.FormSelect onChange={handleChangeServices}>
                                <Styled.Option>Seleccionar servicio</Styled.Option>
                                {servicesArray?.length && servicesArray.map(service => (
                                    <Styled.Option value={service.name} key={service.name}>{service.name}</Styled.Option>
                                ))}
                            </Styled.FormSelect>
                            <Styled.InputLogin placeholder="Escribir servicio" name='service' value={service} onChange={handleChangeServices} />
                        </Styled.BetweenContainer>
                        <Styled.FormSelect onChange={handleChangeExtras}>
                            <Styled.Option>Seleccionar extras</Styled.Option>
                            {extrasArray?.length && extrasArray.map(service => (
                                <Styled.Option value={service.name} key={service.name}>{service.name}</Styled.Option>
                            ))}
                        </Styled.FormSelect>
                        <div style={{ display: 'flex', gap: '20px' }}>
                            {extrasSelected?.length > 0 && extrasSelected.map(extra => (
                                <div style={{ gap: '3px' }} key={extra}>
                                    <button onClick={() => handleRemoveExtra(extra)} >X</button><label>{extra}</label>
                                </div>
                            ))}
                        </div>
                        <Styled.InputLogin
                            placeholder="Nombre completo"
                            name="name"
                            value={newClient.name}
                            onChange={handleChange}
                        />
                        <Styled.InputLogin
                            maxLength={10}
                            placeholder="Celular"
                            name="phone"
                            value={newClient.phone}
                            onChange={handleChange}
                        />
                        <Styled.SubmitButton onClick={handleSubmit}>Registrar</Styled.SubmitButton>
                    </Styled.ItemContainer>
                    <br />
                    <br />
                    <br />
                    <br />
                    <SimpleSnackbar open={openSnackbar} setOpen={setOpenSnackbar} title="Cliente registrado" />
                </Styled.ColumnContainer>
            </Styled.Container >
        </>
    );
}

