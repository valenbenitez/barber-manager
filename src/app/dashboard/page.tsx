'use client'
import { useEffect, useState } from "react";
import { useUser } from "@/hooks/useUser";
import { Container, ColumnContainer, ItemContainer, RowContainer, Label } from "./style";
import { Button, ButtonGroup, Fab } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import withAuth from "@/components/WithAuth";
import BarberiaInfo from "./components/BarberiaInfo";
import PeluqueriaInfo from "./components/PeluqueriaInfo";
import BellezaInfo from "./components/BellezaInfo";
import { CenterContainer } from "./barberos/style";
import EmployeesInfo from "./components/EmployeesInfo";
import ModalSellProduct from "./products/components/ModalSellProduct";
import CreateAppointment from "./appointments/components/CreateAppointment";
import NextAppointments from "@/components/NextAppointments";
//TODO: ARREGLAR BOTONES EN MOBILE

const buttons = [
  { path: '/dashboard/appointments', icon: '/navbar-icons/see-appointments.svg', label: 'Ver turnos' },
  { path: '/dashboard/clientes', icon: '/navbar-icons/add.svg', label: 'Nuevo servicio' },
  // { path: '/dashboard/clientes', icon: '/navbar-icons/user-list.svg', label: 'Clientes' },
  // { path: '/dashboard/registrar-cliente', icon: '/navbar-icons/users.svg', label: 'Registrar cliente' },
  // { path: '/dashboard/registrar-barbero', icon: '/navbar-icons/users.svg', label: 'Registrar barbero' },
  // { path: '/dashboard/barber-view', icon: '/navbar-icons/view.svg', label: 'Vista barbero' },
]

function Dashboard() {
  const [clients, setClients] = useState([]);
  const { getUser, getUsersByRole, registerEmployee } = useUser();
  const { authState, signOutUser } = useAuth();
  const [firstTime, setFirstTime] = useState(true)
  const [drawerCreateAppointment, setDrawerCreateAppointment] = useState(false)
  const [modalSellProduct, setModalSellProduct] = useState(false)
  const [type, setType] = useState<'barberia' | 'peluqueria' | 'belleza'>('barberia')

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
    // await registerEmployee()
    await getUser(authState?.user?.id)
  }

  const handleServiceChange = (service: 'barberia' | 'peluqueria' | 'belleza') => {
    setType(service);
  };

  //HACER COMPONENTES DE INFORMACION DE CADA TIPO
  const componentsOfInfo = {
    barberia: (<BarberiaInfo />),
    peluqueria: (<PeluqueriaInfo />),
    belleza: (<BellezaInfo />),
  }[type]

  return (
    <div style={{ padding: '8px' }}>
      <Container>
        <ColumnContainer>
          <ItemContainer>
            <Button variant="outlined" color="error" onClick={signOutUser}>Cerrar sesion</Button>
            <RowContainer>
              {!modalSellProduct && !drawerCreateAppointment && (
                <>
                  {buttons?.length && buttons.map(button => (
                    <Link legacyBehavior href={button.path} key={button.path}>
                      <a href={button.path} key={button.path} style={{ textDecoration: 'none', color: '#000' }} >
                        <ItemColumn icon={button.icon} label={button.label} />
                      </a>
                    </Link>
                  ))}
                </>
              )}
              {!modalSellProduct && !drawerCreateAppointment && (
                <span onClick={() => setDrawerCreateAppointment(true)}>
                  <ItemColumn icon={'/navbar-icons/appointment.svg'} label={'Registrar turno'} />
                </span>
              )}
              {!modalSellProduct && !drawerCreateAppointment && (
                <span onClick={() => setModalSellProduct(true)} >
                  <ItemColumn icon={'/navbar-icons/products.svg'} label={'Registrar venta'} />
                </span>
              )}
            </RowContainer>
          </ItemContainer>
          <ButtonGroup style={{ padding: '10px', gap: '10px', backgroundColor: '#fff' }} size="large">
            <Button style={{ borderRadius: '12px', padding: '12px' }} onClick={() => handleServiceChange('barberia')} variant="contained" color="primary" disabled={type === 'barberia' ? true : false}>BARBERIA</Button>
            <Button style={{ borderRadius: '12px', padding: '12px' }} onClick={() => handleServiceChange('peluqueria')} variant="contained" color="warning" disabled={type === 'peluqueria' ? true : false}>PELUQUERIA</Button>
            <Button style={{ borderRadius: '12px', padding: '12px' }} onClick={() => handleServiceChange('belleza')} variant="contained" color="secondary" disabled={type === 'belleza' ? true : false}>BELLEZA</Button>
          </ButtonGroup>
          <ItemContainer>
            {componentsOfInfo}
          </ItemContainer>
          <br />
          <ItemContainer>
            <NextAppointments />
          </ItemContainer>
          <CreateAppointment open={drawerCreateAppointment} setOpen={setDrawerCreateAppointment} />
          <ModalSellProduct isModalOpen={modalSellProduct} setIsModalOpen={setModalSellProduct} />
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
    <Fab size="large" sx={SectionButtons}>
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

{/* <br />
          <ItemContainer>
            <h4>Disponibilidad barberos</h4>
            <BarberStatus />
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
          <br /> */}
