"use client";
import NavBar from "@/components/NavBar/NavBar";
import React, { useEffect, useState } from "react";
import * as Styled from "./style";
import Fab from "@mui/material/Fab";
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@/hooks/useUser";
import { User } from "@/models/user";

function Dashboard() {
  const [clients, setClients] = useState<User[]>([]);
  const { getUsersByRole } = useUser();

  useEffect(() => {
    if (clients.length === 0) {
      getUsersByRole().then((result) => {
        setClients(result);
      });
    }
  }, []);

  function formatSecondsAndNanosecondsToDate(seconds, nanoseconds) {
    const milliseconds = Math.floor(nanoseconds / 1e6); // Convertir nanosegundos a milisegundos
    const date = new Date(seconds * 1000 + milliseconds);
    return date.toLocaleString(); // Puedes utilizar otras opciones de formato según tus necesidades
  }

  return (
    <div>
      <Styled.Container>
        <Styled.ColumnContainer>
          <Styled.ItemContainer>
            <Styled.StartContainer>
              <Styled.Title>Cortes diarios:</Styled.Title>
            </Styled.StartContainer>
            <Styled.Title>17</Styled.Title>
            <Styled.RowContainer>
              <Link legacyBehavior href={"/registrar-cliente"}>
                <Styled.ColumnContainer>
                  <Fab size="small" sx={SectionButtons}>
                    <Image
                      alt=""
                      src={"/navbar-icons/users.svg"}
                      height={20}
                      width={20}
                    />
                  </Fab>
                  <Styled.Label>Registrar cliente</Styled.Label>
                </Styled.ColumnContainer>
              </Link>
              <Link legacyBehavior href={"/registrar-corte"}>
                <Styled.ColumnContainer>
                  <Fab size="small" sx={SectionButtons}>
                    <Image
                      alt=""
                      src={"/navbar-icons/add.svg"}
                      height={20}
                      width={20}
                    />
                  </Fab>
                  <Styled.Label>Registrar corte</Styled.Label>
                </Styled.ColumnContainer>
              </Link>
              <Link legacyBehavior href={"/registrar-venta-producto"}>
                <Styled.ColumnContainer>
                  <Fab size="small" sx={SectionButtons}>
                    <Image
                      alt=""
                      src={"/navbar-icons/products.svg"}
                      height={20}
                      width={20}
                    />
                  </Fab>
                  <Styled.Label>Registrar venta</Styled.Label>
                </Styled.ColumnContainer>
              </Link>
            </Styled.RowContainer>
          </Styled.ItemContainer>
          <br />
          <Styled.ItemContainer>
            <Styled.StartContainer>
              <Styled.Title>Ultimos clientes:</Styled.Title>
            </Styled.StartContainer>
            {clients?.length &&
              clients.map((client: any) => (
                <>
                  <label>{client?.name}</label>
                  <label>
                    {formatSecondsAndNanosecondsToDate(
                      client.createdAt?.seconds,
                      client.createdAt?.nanoseconds,
                    )}
                  </label>
                  <label>{}</label>
                </>
              ))}
          </Styled.ItemContainer>
        </Styled.ColumnContainer>
      </Styled.Container>
      <NavBar />
    </div>
  );
}

const SectionButtons = {
  backgroundColor: "#fff",
  boxShadow: "none",
};

export default Dashboard;
