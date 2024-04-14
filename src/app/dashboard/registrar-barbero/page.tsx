"use client";
import React, { useEffect, useState } from "react";
import * as Styled from "./style";
import { useUser } from "@/hooks/useUser";
import { v4 as uuidv4 } from 'uuid';
import SimpleSnackbar from "@/components/SimpleSnackbar/SimpleSnackbar";
import { NextResponse } from "next/server";
import { useRouter } from "next/navigation";
import { CircularProgress } from "@mui/material";
import { useAuth } from "@/hooks/useAuth";

const initialNewClient = {
    name: "",
    phone: "",
    email: ""
};

export default function RegisterBarber() {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [newClient, setNewClient] = useState(initialNewClient);
    const { createUser, isOwner, getUser } = useUser();
    const { authState } = useAuth();
    const router = useRouter();

    useEffect(() => {
        fetchUser()
    }, [])

    const fetchUser = () => {
        getUser(authState?.user?.id).then((user) => {
            if (user?.role !== 'owner') {
                router.push('/dashboard')
            } else {
                setIsLoading(false)
            }
        })
    }

    const handleChange = (event) => {
        setNewClient({
            ...newClient,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async () => {
        const id = uuidv4();
        const newUser = await createUser({
            createdAt: new Date(),
            role: 'barber',
            name: newClient.name,
            phone: newClient.phone,
            id: id,
            email: ''
        })
        setNewClient(initialNewClient)
        setOpenSnackbar(true)
        return newUser
    }

    if (isLoading) {
        return (
            <Styled.Container>
                <CircularProgress />
            </Styled.Container>
        )
    }

    return (
        <>
            <Styled.Container>
                <Styled.ColumnContainer>
                    <Styled.ItemContainer>
                        <Styled.Title>Registrar barbero</Styled.Title>
                        <Styled.InputLogin
                            placeholder="Nombre"
                            name="name"
                            value={newClient.name}
                            onChange={handleChange}
                        />
                        <Styled.InputLogin
                            placeholder="Email"
                            name="email"
                            value={newClient.email}
                            onChange={handleChange}
                        />
                        <Styled.InputLogin
                            placeholder="Celular"
                            name="phone"
                            value={newClient.phone}
                            onChange={handleChange}
                            type="number"
                        />
                    </Styled.ItemContainer>
                    <br />
                    <br />
                    <Styled.SubmitButton onClick={handleSubmit}>Registrar</Styled.SubmitButton>
                    <SimpleSnackbar open={openSnackbar} setOpen={setOpenSnackbar} title="Cliente registrado" />
                </Styled.ColumnContainer>
            </Styled.Container>
        </>
    );
}

