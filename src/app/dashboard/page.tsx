'use client'
import { useEffect, useState } from "react";
import { useUser } from "@/hooks/useUser";
import { Container, ColumnContainer, ItemContainer, StartContainer, Title, RowContainer, Label } from "./style";
import { Button, Fab } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import ShaveCard from "@/components/ShaveCard/ShaveCard";
import { useAuth } from "@/hooks/useAuth";
import withAuth from "@/components/WithAuth";

const buttons = [
  // { path: '/dashboard/registrar-barbero', icon: '/navbar-icons/users.svg', label: 'Registrar barbero' },
  { path: '/dashboard/registrar-corte', icon: '/navbar-icons/add.svg', label: 'Registrar corte' },
  { path: '/dashboard/clientes', icon: '/navbar-icons/user-list.svg', label: 'Clientes' },
  { path: '/dashboard/registrar-venta-producto', icon: '/navbar-icons/products.svg', label: 'Registrar venta' },
  { path: '/dashboard/barber-view', icon: '/navbar-icons/view.svg', label: 'Vista barbero' },
]

function Dashboard() {
  const [clients, setClients] = useState([]);
  const { getUser, getUsersByRole } = useUser();
  const { authState, signOutUser } = useAuth();
  const [firstTime, setFirstTime] = useState(true)

  useEffect(() => {
    if (clients.length === 0 && firstTime) {
      getUsersByRole().then((result) => {
        fetchUser()
        setClients(result);
        setFirstTime(false)
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
            {/* <StartContainer>
              <Title>Cortes diarios:</Title>
            </StartContainer>
            <Title>0</Title> */}
            <Button variant="outlined" color="error" onClick={signOutUser}>Cerrar sesion</Button>
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
              <label>Cortes en proceso:</label>
            </StartContainer>
            <ShaveCard status="En proceso" />
            <StartContainer>
              <label>Cortes en espera:</label>
            </StartContainer>
            <ShaveCard status="En espera" />
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
