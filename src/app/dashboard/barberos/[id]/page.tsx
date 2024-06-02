'use client'
import React, { Suspense, useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import * as Styled from './style'
import { useCortes } from '@/hooks/useCortes'
import { useUser } from '@/hooks/useUser'
import { Button, Card, Space, Spin, Tag, Typography } from 'antd'
import { User } from '@/models/user'
import DataTable from 'react-data-table-component'
import { useMediaQuery } from '@mui/material'
import { isThisMonth, isThisWeek, isToday } from 'date-fns'
import { Style } from '@mui/icons-material'

const { Title } = Typography;

function formatSecondsAndNanosecondsToDate(seconds, nanoseconds) {
    const milliseconds = Math.floor(nanoseconds / 1e6); // Convertir nanosegundos a milisegundos
    const date = new Date(seconds * 1000 + milliseconds);
    return date.toLocaleString(); // Puedes utilizar otras opciones de formato según tus necesidades
}

export default function BarberPage() {
    const [isLoading, setIsLoading] = useState(false)
    const [userBarber, setUserBarber] = useState<User | any>({})
    const [cortesOfDay, setCortesOfDay] = useState([]);
    const [cortesOfWeek, setCortesOfWeek] = useState([]);
    const [cortesOfMonth, setCortesOfMonth] = useState([]);
    const [billedToday, setBilledToday] = useState(0);
    const [billedWeek, setBilledWeek] = useState(0);
    const [billedMonth, setBilledMonth] = useState(0);
    const [cortes, setCortes] = useState([])
    const { id } = useParams()
    const { getCortesByBarberId } = useCortes()
    const { getUserById } = useUser()
    const isMobileScreen = useMediaQuery('(max-width:1199px)');
    const columns = [
        {
            name: 'Barbero',
            selector: row => row?.barberName,
        },
        {
            name: 'Cliente',
            selector: row => row?.clientName,
        },
        {
            name: 'Contacto',
            selector: row => row.clientPhone,
        },
        {
            name: 'Cobrado',
            selector: row => row.price,
        },
        {
            name: 'Servicio',
            selector: row => `${row.type} - ${row?.service}`,
        },
        {
            name: 'Descripcion',
            selector: row => row?.description,
        },
        {
            name: 'Fecha',
            selector: row => formatSecondsAndNanosecondsToDate(row.createdDate.seconds, row.createdDate.nanoseconds),
            sortable: true
        },
    ];

    useEffect(() => {
        fetchData();
    }, [])

    async function fetchData() {
        setIsLoading(true)
        let totalOfDay = 0
        let totalOfWeek = 0
        let totalOfMonth = 0
        const cortes = await getCortesByBarberId(id)
        const user = await getUserById(id)
        const cortesHoy = cortes.filter(corte => isToday(new Date(corte.createdDate.seconds * 1000)));
        const cortesEstaSemana = cortes.filter(corte => isThisWeek(new Date(corte.createdDate.seconds * 1000), { weekStartsOn: 1 }));
        const cortesEsteMes = cortes.filter(corte => isThisMonth(new Date(corte.createdDate.seconds * 1000)));
        cortesHoy.forEach((op) => {
            const price = op?.price
            const cleanedString = typeof price === 'string' ? price.replace(/\./g, '') : price
            totalOfDay = totalOfDay + Number(cleanedString)
        });
        cortesEstaSemana.forEach((op) => {
            const price = op?.price
            const cleanedString = typeof price === 'string' ? price.replace(/\./g, '') : price;
            totalOfWeek = totalOfWeek + Number(cleanedString)
        });
        cortesEsteMes.forEach((op) => {
            const price = op?.price
            const cleanedString = typeof price === 'string' ? price.replace(/\./g, '') : price
            totalOfMonth = totalOfMonth + Number(cleanedString)
        });

        setCortes(cortes)
        setCortesOfDay(cortesHoy)
        setCortesOfWeek(cortesEstaSemana)
        setCortesOfMonth(cortesEsteMes)
        setBilledToday(totalOfDay)
        setBilledWeek(totalOfWeek)
        setBilledMonth(totalOfMonth)
        setUserBarber(user)
        setIsLoading(false)
    }

    function formatToArgentinianPesos(number) {
        return new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS',
            minimumFractionDigits: 2
        }).format(number);
    }

    if (isLoading) {
        return (
            <Styled.Container>
                <Styled.ItemContainer>
                    <Styled.StartContainer>
                        <Spin />
                    </Styled.StartContainer>
                </Styled.ItemContainer>
            </Styled.Container>
        )
    }

    return (
        <Styled.Container>
            <Styled.ItemContainer>
                <Styled.ColumnContainer>
                    <Styled.StartContainer>
                        <h4>{userBarber?.name}</h4>
                    </Styled.StartContainer>
                    <Space direction={isMobileScreen ? "vertical" : "horizontal"} align='start' size={16}>
                        <Card title="Cortes" style={{ width: '100%', minWidth: 300 }}>
                            <Title level={5}>Cortes de hoy: <Tag color='blue'>{cortesOfDay?.length}</Tag></Title>
                            <Title level={5}>Cortes de la semana: <Tag color='blue'>{cortesOfWeek?.length}</Tag></Title>
                            <Title level={5}>Cortes del mes: <Tag color='blue'>{cortesOfMonth?.length}</Tag></Title>
                        </Card>
                        <Card title="Facturacion (cortes)" style={{ width: '100%', minWidth: 300 }}>
                            <Title level={5}>Facturacion de hoy: <Tag color='green'>{formatToArgentinianPesos(billedToday)}</Tag></Title>
                            <Title level={5}>Facturacion de la semana: <Tag color='green'>{formatToArgentinianPesos(billedWeek)}</Tag></Title>
                            <Title level={5}>Facturacion del mes: <Tag color='green'>{formatToArgentinianPesos(billedMonth)}</Tag></Title>
                        </Card>
                    </Space>
                    <DataTable
                        columns={columns}
                        data={cortes}
                        pagination
                    />
                </Styled.ColumnContainer>
            </Styled.ItemContainer>
        </Styled.Container>
    )
}
