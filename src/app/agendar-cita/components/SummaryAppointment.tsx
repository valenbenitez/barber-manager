'use client'
import React from 'react'
import moment from 'moment';
import { Space, Divider, Button } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons'
import { useAppointments } from '@/hooks/useAppointments';
import { v4 as uuidv4 } from 'uuid';
import { Timestamp } from 'firebase/firestore';


interface SummaryAppointmentProps {
    serviceType: string;
    descriptionService: string;
    selectedDate: any;
    selectedTime: any;
    barberSelected: any;
    clientInfo: any;
    setScreen: any;
}

export default function SummaryAppointment({ barberSelected, clientInfo, descriptionService, selectedDate, selectedTime, serviceType, setScreen }: SummaryAppointmentProps) {
    const { createAppointment } = useAppointments();

    const handleSubmit = async () => {
        const [hour, minute] = selectedTime.split(':').map(Number);
        const dateTime = moment(selectedDate).set({ hour, minute }).toDate();
        const firebaseTimestamp = Timestamp.fromDate(dateTime);

        const postAppointment = {
            id: uuidv4(),
            clientId: false,
            clientName: clientInfo.name,
            clientPhone: clientInfo.phone,
            barberId: barberSelected.id,
            barberName: barberSelected.name,
            createdDate: new Date(),
            appointmentDate: firebaseTimestamp,
            type: serviceType,
            description: descriptionService
        }
        await createAppointment(postAppointment)
        setScreen('success')
    }
    return (
        <>
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                <Space direction="horizontal" style={{ justifyContent: 'space-between', width: '100%' }}>
                    <label>Personal:</label>
                    <label><b>{barberSelected?.name}</b></label>
                </Space>
                <Space direction="horizontal" style={{ justifyContent: 'space-between', width: '100%' }}>
                    <label>Cliente:</label>
                    <label><b>{clientInfo?.name}</b></label>
                </Space>
                <Space direction="horizontal" style={{ justifyContent: 'space-between', width: '100%' }}>
                    <label>Telefono:</label>
                    <label><b>{clientInfo?.phone}</b></label>
                </Space>
                <Space direction="horizontal" style={{ justifyContent: 'space-between', width: '100%' }}>
                    <label>Servicio:</label>
                    <label><b>{serviceType}</b></label>
                </Space >
                <Space direction="horizontal" style={{ justifyContent: 'space-between', width: '100%' }}>
                    <label>Descripción del servicio:</label>
                    <label><b>{descriptionService}</b></label>
                </Space >
                {selectedDate && selectedTime && (
                    <>
                        <Divider />
                        <Space direction="horizontal" style={{ justifyContent: 'space-between', width: '100%' }}>
                            <label>Fecha y Hora Seleccionada:</label>
                            <label>
                                <b>{moment(selectedDate).format('DD-MM-YYYY')} a las {selectedTime}</b>
                            </label>
                        </Space >
                    </>
                )
                }
            </Space>
            <br />
            <InfoCircleOutlined />
            <label>
                Te enviaremos la confirmacion por WhatsApp
            </label>
            <br />
            <Button onClick={handleSubmit} type='primary'>Confirmar reserva</Button>
            <br />
        </>
    )
}
