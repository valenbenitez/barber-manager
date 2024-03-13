"use client";
import React, { useEffect, useState } from "react";
import * as Styled from "./style";
import { useUser } from "@/hooks/useUser";
import { v4 as uuidv4 } from 'uuid';
import SimpleSnackbar from "@/components/SimpleSnackbar/SimpleSnackbar";
import NavBar from "@/components/NavBar/NavBar";
import { User } from "@/models/user";
import { useCortes } from "@/hooks/useCortes";
import { initialNewClient } from "./constants";

export default function RegistrarCorte() {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [newClient, setNewClient] = useState(initialNewClient);
    const [barbers, setBarbers] = useState<User[]>([])
    const [barberSelected, setBarberSelected] = useState<User[]>([])
    const { createUser, getBarbers } = useUser();
    const { createCorte } = useCortes();

    useEffect(() => {
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

    const fetchBarbers = async () => {
        const barbers = await getBarbers()
        setBarbers(barbers)
    };

    const handleSubmit = async () => {
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
            barberName: barberSelected,
            createdDate: new Date(),
            id: corteId,
            price: 0,
            status: 'En espera',
            clientName: newClient.name,
            clientPhone: newClient.phone
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
                                <Styled.Option value={barber.name} key={barber.id} >{barber.name}</Styled.Option>
                            ))}
                        </Styled.FormSelect>
                        <Styled.InputLogin
                            placeholder="Nombre"
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
            </Styled.Container>
            <NavBar />
        </>
    );
}

