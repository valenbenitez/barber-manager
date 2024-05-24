'use client'
import React, { useEffect, useState } from 'react';
import * as Styled from './style';
import { useAppointments } from '@/hooks/useAppointments';
import { Button, Card, Flex, Input } from 'antd';
import { Spin } from 'antd';
import UpdateAppointment from './components/UpdateAppointment';
import { useCortes } from '@/hooks/useCortes';
import { v4 as uuidv4 } from 'uuid';
import SimpleSnackbar from '@/components/SimpleSnackbar/SimpleSnackbar';

export default function Page() {
    const [turnoCreated, setTurnoCreated] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [updateAppointment, setUpdateAppointment] = useState(false)
    const [appointmentsFiltered, setAppointmentsFiltered] = useState<any>({});
    const [appointmentToUpdate, setAppointmentToUpdate] = useState<any>('');
    const [allAppointments, setAllAppointments] = useState<any>({});
    const [filterDate, setFilterDate] = useState<any>('');
    const { getAppointments, deleteAppointment, appointments, getAppointmentById } = useAppointments();
    const { createCorte } = useCortes();

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        organizeAppointments(appointments)
    }, [appointments])

    const handleDateChange = (e) => {
        setFilterDate(e.target.value);
        filterAppointments(e.target.value);
    };

    const fetchData = async () => {
        setIsLoading(true)
        let fetchedAppointments = await getAppointments();
        // Asegúrate de que fetchedAppointments es un array
        if (Array.isArray(fetchedAppointments) && fetchedAppointments.length > 0) {
            organizeAppointments(fetchedAppointments);
        }
    };

    const organizeAppointments = (appointments) => {
        const sortedAppointments = appointments.sort((a, b) => {
            const dateA = new Date(a.appointmentDate?.seconds * 1000 + a.appointmentDate?.nanoseconds / 1000000);
            const dateB = new Date(b.appointmentDate?.seconds * 1000 + b.appointmentDate?.nanoseconds / 1000000);
            return dateA.getTime() - dateB.getTime();
        });

        const groupedByDate = sortedAppointments.reduce((acc, appointment) => {
            const date = new Date(appointment.appointmentDate?.seconds * 1000 + appointment.appointmentDate?.nanoseconds / 1000000);
            const dateKey = formatDate(date); // Utilizar la función formatDate para evitar problemas de zona horaria
            if (!acc[dateKey]) {
                acc[dateKey] = [];
            }
            acc[dateKey].push(appointment);
            return acc;
        }, {});
        setAppointmentsFiltered(groupedByDate);
        setAllAppointments(groupedByDate);
        setIsLoading(false)
    };

    const filterAppointments = (date) => {
        if (date) {
            const formattedFilterDate = formatDate(new Date(date));
            const filtered = Object.keys(allAppointments).reduce((acc, key) => {
                if (key === formattedFilterDate) {
                    acc[key] = allAppointments[key];
                }
                return acc;
            }, {});
            setAppointmentsFiltered(filtered);
        } else {
            setAppointmentsFiltered(allAppointments);
        }
    };

    const formatDate = (date) => {
        // Formatear la fecha como DD/MM/YYYY
        const day = String(date.getUTCDate()).padStart(2, '0');
        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
        const year = date.getUTCFullYear();
        return `${day}/${month}/${year}`;
    };

    const handleUpdateAppointment = (appointmentId: string) => {
        setAppointmentToUpdate(appointmentId)
        setUpdateAppointment(true)
    }

    const handleCreateCorte = async (appointmentId: string) => {
        setIsLoading(true)
        const corteId = uuidv4();
        const appointment = await getAppointmentById(appointmentId)
        console.log(appointment)
        const newCorte = await createCorte({
            barberName: appointment.barberName,
            barberId: appointment.barberId,
            createdDate: new Date(),
            id: corteId,
            price: 0,
            status: 'En proceso',
            clientName: appointment.clientName,
            clientPhone: appointment.clientPhone,
            service: appointment.type,
            type: appointment.type,
            extras: [],
            description: appointment?.description
        })
        setTurnoCreated(true)
    }

    return (
        <Styled.Container>
            <Styled.ItemContainer>
                <Styled.StartContainer>
                    <Styled.ColumnContainer>
                        <h2>Turnos</h2>
                        <Input style={{ maxWidth: 160 }} type="date" value={filterDate} onChange={handleDateChange} />
                        <br />
                        {isLoading && (
                            <Spin />
                        )}
                        {Object.entries(appointmentsFiltered).reverse().map(([date, appointments]) => (
                            <div key={date}>
                                <h4>{date}</h4>
                                <Flex wrap gap="small">
                                    {Array.isArray(appointments) && appointments.map(appointment => (
                                        <Card key={appointment.id} style={{ marginTop: '6px', width: '400px' }}>
                                            <Styled.ColumnContainer>
                                                <div>
                                                    <label>Cliente: <b>{appointment.clientName}</b></label>
                                                    <br />
                                                    <label>Servicio: <b>{appointment.type}</b></label>
                                                    <br />
                                                    <p>Descripcion: {appointment.description}</p>
                                                    <p>Horario: <b>{new Date(appointment.appointmentDate?.seconds * 1000).toLocaleTimeString()}</b></p>
                                                </div>
                                                <Styled.EndContainer>
                                                    <Button danger={true} onClick={() => deleteAppointment(appointment.id)}>Eliminar turno</Button>
                                                    <Button type='primary' onClick={() => handleUpdateAppointment(appointment.id)} >Editar turno</Button>
                                                    <Button type='primary' onClick={() => handleCreateCorte(appointment.id)} >Iniciar turno</Button>
                                                </Styled.EndContainer>
                                            </Styled.ColumnContainer>
                                        </Card>
                                    ))}
                                </Flex>
                                <br />
                            </div>
                        ))}
                    </Styled.ColumnContainer>
                </Styled.StartContainer>
                <SimpleSnackbar open={turnoCreated} setOpen={setTurnoCreated} title='Turno en proceso' />
            </Styled.ItemContainer>
            <UpdateAppointment open={updateAppointment} setOpen={setUpdateAppointment} appointmentId={appointmentToUpdate} />
        </Styled.Container>
    )
}
