"use client";
import React, { useState } from "react";
import * as Styled from "./style";
import { useUser } from "@/hooks/useUser";
import { v4 as uuidv4 } from 'uuid';
import SimpleSnackbar from "@/components/SimpleSnackbar/SimpleSnackbar";
import NavBar from "@/components/NavBar/NavBar";

const initialNewClient = {
    name: "",
    phone: "",
};

export default function RegisterClient() {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [newClient, setNewClient] = useState(initialNewClient);
    const { createUser } = useUser();

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
            role: 'client',
            name: newClient.name,
            phone: newClient.phone,
            id: id,
            email: ''
        })
        console.log(newUser)
        setNewClient(initialNewClient)
        setOpenSnackbar(true)
        return newUser
    }
    return (
        <>
            <Styled.Container>
                <Styled.ColumnContainer>
                    <Styled.ItemContainer>
                        <Styled.Title>Registrar cliente</Styled.Title>
                        <Styled.InputLogin
                            placeholder="Nombre"
                            name="name"
                            value={newClient.name}
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
            <NavBar />
        </>
    );
}

