"use client";
import React, { useEffect, useState } from 'react';
import { Button, Spin } from 'antd';
import { Layout } from 'antd';
import SetAppointment from './components/SetAppointment';
import { Card } from 'antd';
import SetBarberServices from './components/BarberServices';
import PeluqueriaServices from './components/PeluqueriaServices';
import BellezaServices from './components/BellezaServices';
import { Tag } from 'antd';
import UserInfo from './components/UserInfo';
import SetPersonal from './components/SetPersonal';
import { User } from '@/models/user';
import { initialNewClient } from '../dashboard/registrar-corte/constants';
import SummaryAppointment from './components/SummaryAppointment';
import SuccessScreen from './components/SuccessScreen';

const { Header, Content, Footer } = Layout;
const initialClientInfo = initialNewClient

const DateTimePicker = () => {
    const [loading, setLoading] = useState(true);
    const [screen, setScreen] = useState('');
    const [serviceType, setServiceType] = useState('');
    const [descriptionService, setDescriptionService] = useState('')
    const [selectedDate, setSelectedDate] = useState<any>(null);
    const [selectedTime, setSelectedTime] = useState<any>(null);
    const [barberSelected, setBarberSelected] = useState<User[]>([])
    const [clientInfo, setClientInfo] = useState(initialClientInfo)


    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000); // Mostrar spin por 2 segundos

        return () => clearTimeout(timer); // Limpiar el timer si el componente se desmonta
    }, []);

    const handleScreen = (screen: string, service: string) => {
        setServiceType(service)
        setScreen(screen)
    }

    const serviceComponentMap = {
        barberiaAppointment: <SetAppointment serviceType="barberia" selectedDate={selectedDate} selectedTime={selectedTime} setSelectedDate={setSelectedDate} setSelectedTime={setSelectedTime} setScreen={setScreen} />,
        peluqueriaAppointment: <SetAppointment serviceType="peluqueria" selectedDate={selectedDate} selectedTime={selectedTime} setSelectedDate={setSelectedDate} setSelectedTime={setSelectedTime} setScreen={setScreen} />,
        bellezaAppointment: <SetAppointment serviceType="belleza" selectedDate={selectedDate} selectedTime={selectedTime} setSelectedDate={setSelectedDate} setSelectedTime={setSelectedTime} setScreen={setScreen} />,
        barberiaServices: <SetBarberServices serviceType={serviceType} setDescriptionService={setDescriptionService} setScreen={setScreen} />,
        peluqueriaServices: <PeluqueriaServices />,
        bellezaServices: <BellezaServices />,
        setPersonal: <SetPersonal serviceType={serviceType} setScreen={setScreen} barberSelected={barberSelected} setBarberSelected={setBarberSelected} />,
        userInfo: <UserInfo clientInfo={clientInfo} setClientInfo={setClientInfo} setScreen={setScreen} />,
        summary: <SummaryAppointment setScreen={setScreen} serviceType={serviceType} descriptionService={descriptionService} selectedDate={selectedDate} selectedTime={selectedTime} barberSelected={barberSelected} clientInfo={clientInfo} />,
        success: <SuccessScreen />,
        // Agrega más servicios y componentes según sea necesario
    };

    if (loading) {
        return (
            <div style={centerContainer}>
                <Spin size='large' />
            </div>
        )
    }

    return (
        <Layout style={{ minHeight: '100svh' }}>
            <Header style={{ display: 'flex', alignItems: 'center', backgroundColor: '#000' }} >
                <h1 style={{ color: '#fff' }}>SALT LIGHT</h1>
            </Header>
            <div style={centerContainer} >
                <Card
                    style={{ width: '90%', maxWidth: '450px', minHeight: 400, marginBottom: '6px' }}
                    title={'Seleccionar servicio'}
                    extra={<Button onClick={() => setScreen('')}>Atras</Button>}
                >
                    <div style={centerCardStyle}>
                        {screen === '' ? (
                            <>
                                <Button style={buttonStyle} type="primary" icon={'💈'} size={'large'} onClick={() => handleScreen('barberiaServices', 'barberia')}>Barbería</Button>
                                <Button disabled={true} style={buttonStyle} type="primary" icon={'💇‍♀️'} size={'large'} onClick={() => handleScreen('peluqueriaServices', 'peluqueria')}>Peluquería</Button>
                                <Button disabled={true} style={buttonStyle} type="primary" icon={'💅🏻'} size={'large'} onClick={() => handleScreen('bellezaServices', 'belleza')}>Belleza</Button>
                            </>
                        ) : (
                            serviceComponentMap[screen] // Renderiza el componente basado en el servicio seleccionado
                        )}
                    </div>
                </Card>
                <Tag>Preguntas? <a href='https://wa.link/kfkhlc' target='_blank'><u>Soporte</u></a></Tag>
            </div>
        </Layout>
    );
};

export default DateTimePicker;

const centerContainer: any = { display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '90svh', flexDirection: 'column' }

const centerCardStyle: any = { display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }

const buttonStyle = { width: '80%', marginBottom: '10px' }