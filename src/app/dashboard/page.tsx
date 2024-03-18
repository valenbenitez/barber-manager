'use client'
import { useEffect, useState } from "react";
import { useUser } from "@/hooks/useUser";
import { Container, ColumnContainer, ItemContainer, StartContainer, Title, RowContainer, Label } from "./style";
import { Fab } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import NavBar from "@/components/NavBar/NavBar";
import { useCortes } from "@/hooks/useCortes";
import ShaveCard from "@/components/ShaveCard/ShaveCard";

const buttons = [
  { path: '/registrar-barbero', icon: '/navbar-icons/users.svg', label: 'Registrar barbero' },
  { path: '/registrar-corte', icon: '/navbar-icons/add.svg', label: 'Registrar corte' },
  { path: '/registrar-venta-producto', icon: '/navbar-icons/products.svg', label: 'Registrar venta' }
]

function Dashboard() {
  const [clients, setClients] = useState([]);
  const { getUsersByRole } = useUser();

  useEffect(() => {
    if (clients.length === 0) {
      getUsersByRole().then((result) => {
        setClients(result);
      }).catch((error) => {
        console.error("Error fetching clients:", error);
      });
    }
  }, [clients, getUsersByRole]);

  return (
    <div style={{ padding: '8px' }}>
      <Container>
        <ColumnContainer>
          <ItemContainer>
            <StartContainer>
              <Title>Cortes diarios:</Title>
            </StartContainer>
            <Title>0</Title>
            <RowContainer>
              {buttons?.length && buttons.map(button => (
                <Link legacyBehavior href={button.path}>
                  <ItemColumn icon={button.icon} label={button.label} />
                </Link>
              ))}
            </RowContainer>
          </ItemContainer>
          <br />
          <ItemContainer>
            <ShaveCard />
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

{/* SECCION ULTIMOS CLIENTES */ }
{/* <ItemContainer>
            <StartContainer>
              <Title>Ultimos clientes:</Title>
            </StartContainer>
            <ClientsContainer>
              {clients.length > 0 && clients.map((client: User) => (
                <ClientCard key={client?.id} client={client} />
              ))}
            </ClientsContainer>
          </ItemContainer> */}

export default Dashboard;
