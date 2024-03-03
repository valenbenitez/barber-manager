"use client";
import NavBar from "@/components/NavBar/NavBar";
import React, { useEffect, useState } from "react";
import * as Styled from "./style";
import Fab from "@mui/material/Fab";
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@/hooks/useUser";
import { User } from "@/models/user";
import ClientCard from "@/components/ClientCard/ClientCard";

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

  return (
    <div style={{ padding: '8px' }} >
      <Styled.Container>
        <Styled.ColumnContainer>
          <Styled.ItemContainer>
            <Styled.StartContainer>
              <Styled.Title>Cortes diarios:</Styled.Title>
            </Styled.StartContainer>
            <Styled.Title>0</Styled.Title>
            <Styled.RowContainer>
              <Link legacyBehavior href={"/registrar-barbero"}>
                <Styled.ColumnContainer>
                  <Fab size="small" sx={SectionButtons}>
                    <Image
                      alt=""
                      src={"/navbar-icons/users.svg"}
                      height={20}
                      width={20}
                    />
                  </Fab>
                  <Styled.Label>Registrar barbero</Styled.Label>
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
              <Styled.Title>Cortes actuales:</Styled.Title>
            </Styled.StartContainer>
          </Styled.ItemContainer>
          <br />
          <Styled.ItemContainer>
            <Styled.StartContainer>
              <Styled.Title>Ultimos clientes:</Styled.Title>
            </Styled.StartContainer>
            <Styled.ClientsContainer>
              {clients?.length &&
                clients.map((client: any) => (
                  <ClientCard client={client} />
                ))}
            </Styled.ClientsContainer>
          </Styled.ItemContainer>
        </Styled.ColumnContainer>
      </Styled.Container>
      <br />
      <br />
      <br />
      <br />
      <NavBar />
    </div>
  );
}

const SectionButtons = {
  backgroundColor: "#fff",
  boxShadow: "none",
};

export default Dashboard;
