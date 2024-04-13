"use client";
import React, { useEffect, useState } from "react";
import * as Styled from "./style";
import { useUser } from "@/hooks/useUser";
import { v4 as uuidv4 } from 'uuid';
import SimpleSnackbar from "@/components/SimpleSnackbar/SimpleSnackbar";
import NavBar from "@/components/NavBar/NavBar";
import { User } from "@/models/user";
import { useCortes } from "@/hooks/useCortes";
import { extras, initialNewClient, services } from "./constants";
import { useParams } from 'next/navigation'

export default function RegistrarCorte() {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [newClient, setNewClient] = useState(initialNewClient);
    const [barbers, setBarbers] = useState<User[]>([])
    const [service, setService] = useState('')
    const [extrasSelected, setExtrasSelected] = useState<any>([])
    const [barberSelected, setBarberSelected] = useState<User[]>([])
    const { createUser, getBarbers, getUserById } = useUser();
    const { createCorte } = useCortes();
    const params = useParams()

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
        const barbers = await getBarbers()
        setBarbers(barbers)
    };

    const handleRemoveExtra = (extra: string) => {
        const filteredExtras = extrasSelected.filter(ex => ex !== extra)
        setExtrasSelected(filteredExtras)
    }

    const handleSubmit = async () => {
        const barberSelectedData = barberSelected?.length > 0 ? await getUserById(barberSelected) : false
        const id = uuidv4();
        const corteId = uuidv4();
        const newUser = await createUser({
            createdAt: new Date(),
            role: 'client',
            name: newClient.name,
            phone: newClient.phone,
            id: id,
            email: ''
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
            extras: extrasSelected
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
                        <Styled.FormSelect onChange={handleChangeBarber}>
                            <Styled.Option>Seleccionar barbero</Styled.Option>
                            {barbers?.length && barbers.map(barber => (
                                <Styled.Option value={barber.id} key={barber.phone} >{barber.name}</Styled.Option>
                            ))}
                        </Styled.FormSelect>
                        <Styled.FormSelect onChange={handleChangeServices}>
                            {services?.length && services.map(service => (
                                <Styled.Option value={service.name} key={service.name}>{service.name}</Styled.Option>
                            ))}
                        </Styled.FormSelect>
                        <Styled.FormSelect onChange={handleChangeExtras}>
                            <Styled.Option>Seleccionar extras</Styled.Option>
                            {extras?.length && extras.map(service => (
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
                    </Styled.ItemContainer>
                    <br />
                    <br />
                    <Styled.SubmitButton onClick={handleSubmit}>Registrar</Styled.SubmitButton>
                    <SimpleSnackbar open={openSnackbar} setOpen={setOpenSnackbar} title="Cliente registrado" />
                </Styled.ColumnContainer>
            </Styled.Container >
            <NavBar />
        </>
    );
}

