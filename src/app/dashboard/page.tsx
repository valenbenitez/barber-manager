'use client'
import { useEffect, useState } from "react";
import { useUser } from "@/hooks/useUser";
import { Container, ColumnContainer, ItemContainer, StartContainer, Title, RowContainer, Label } from "./style";
import { Fab } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import NavBar from "@/components/NavBar/NavBar";
import ShaveCard from "@/components/ShaveCard/ShaveCard";
import { useAuth } from "@/hooks/useAuth";
import withAuth from "@/components/WithAuth";

const buttons = [
  // { path: '/dashboard/registrar-barbero', icon: '/navbar-icons/users.svg', label: 'Registrar barbero' },
  { path: '/dashboard/registrar-corte', icon: '/navbar-icons/add.svg', label: 'Registrar corte' },
  { path: '/dashboard/clientes', icon: '/navbar-icons/user-list.svg', label: 'Clientes' },
  { path: '/dashboard/registrar-venta-producto', icon: '/navbar-icons/products.svg', label: 'Registrar venta' },
]

function Dashboard() {
  const [clients, setClients] = useState([]);
  const { getUser, getUsersByRole } = useUser();
  const { authState, signOutUser } = useAuth();

  useEffect(() => {
    if (clients.length === 0) {
      getUsersByRole().then((result) => {
        fetchUser()
        setClients(result);
      }).catch((error) => {
        console.error("Error fetching clients:", error);
      });
    }
  }, [clients, getUsersByRole]);

  const fetchUser = async () => {
    await getUser(authState?.user?.id)
  }

  return (
    <div style={{ padding: '8px' }}>
      <Container>
        <ColumnContainer>
          <ItemContainer>
            <StartContainer>
              <Title>Cortes diarios:</Title>
            </StartContainer>
            <Title>0</Title>
            <button onClick={signOutUser}>Cerrar sesion</button>
            <RowContainer>
              {buttons?.length && buttons.map(button => (
                <Link legacyBehavior href={button.path} key={button.path}>
                  <a href={button.path} key={button.path} style={{ textDecoration: 'none', color: '#000' }} >
                    <ItemColumn icon={button.icon} label={button.label} />
                  </a>
                </Link>
              ))}
            </RowContainer>
          </ItemContainer>
          <br />
          <ItemContainer>
            <StartContainer>
              <label>Cortes en espera:</label>
            </StartContainer>
            <ShaveCard status="En espera" />
            <StartContainer>
              <label>Cortes en proceso:</label>
            </StartContainer>
            <ShaveCard status="En proceso" />
            <StartContainer>
              <label>Cortes terminados:</label>
            </StartContainer>
            <ShaveCard status="Terminado" />
          </ItemContainer>
          <br />
        </ColumnContainer>
      </Container>
      <br />
      <br />
      <br />
      <br />
      <NavBar />
    </div>
  );
}

const ItemColumn = ({ icon, label }) => (
  <ColumnContainer>
    <Fab size="small" sx={SectionButtons}>
      <Image alt="" src={icon} height={20} width={20} />
    </Fab>
    <Label>{label}</Label>
  </ColumnContainer>
);

const SectionButtons = {
  backgroundColor: "#fff",
  boxShadow: "none",
};

export default withAuth(Dashboard);
