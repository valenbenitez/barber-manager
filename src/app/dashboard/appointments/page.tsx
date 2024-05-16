'use client'
import React, { useEffect, useState } from 'react';
import * as Styled from './style';
import { useAppointments } from '@/hooks/useAppointments';
import { Card, Input } from 'antd';
import { Spin } from 'antd';

export default function Page() {
    const [isLoading, setIsLoading] = useState(false)
    const [appointmentsFiltered, setAppointmentsFiltered] = useState<any>({});
    const [allAppointments, setAllAppointments] = useState<any>({});
    const [filterDate, setFilterDate] = useState<any>('');
    const { getAppointments } = useAppointments();

    useEffect(() => {
        fetchData();
    }, []);

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
            const dateA = new Date(a.appointmentDate.seconds * 1000 + a.appointmentDate.nanoseconds / 1000000);
            const dateB = new Date(b.appointmentDate.seconds * 1000 + b.appointmentDate.nanoseconds / 1000000);
            return dateA.getTime() - dateB.getTime();
        });

        const groupedByDate = sortedAppointments.reduce((acc, appointment) => {
            const date = new Date(appointment.appointmentDate.seconds * 1000 + appointment.appointmentDate.nanoseconds / 1000000);
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
                        {Object.entries(appointmentsFiltered).map(([date, appointments]) => (
                            <div key={date}>
                                <h4>{date}</h4>
                                <div>
                                    {Array.isArray(appointments) && appointments.map(appointment => (
                                        <Card key={appointment.id} style={{ marginTop: '6px' }}>
                                            <label>Cliente: <b>{appointment.clientName}</b></label>
                                            <br />
                                            <label>Servicio: <b>{appointment.type}</b></label>
                                            <br />
                                            <p>Descripcion: {appointment.description}</p>
                                            <p>Horario: <b>{new Date(appointment.appointmentDate.seconds * 1000).toLocaleTimeString()}</b></p>
                                        </Card>
                                    ))}
                                </div>
                                <br />
                            </div>
                        ))}
                    </Styled.ColumnContainer>
                </Styled.StartContainer>
            </Styled.ItemContainer>
        </Styled.Container>
    )
}
