'use client'
import { useAuth } from '@/hooks/useAuth';
import { useUser } from '@/hooks/useUser';
import { CircularProgress, useMediaQuery } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import * as Styled from './style'
import { useCortes } from '@/hooks/useCortes';
import { Card, Space, Typography, Tag, Input } from "antd";
import { useSales } from '@/hooks/useSales';

const { Text, Title } = Typography;

export default function Facturacion() {
    const [isLoading, setIsLoading] = useState(true);
    const [firstTime, setFirstTime] = useState(true)
    const [filterDate, setFilterDate] = useState<any>('');
    const { getUser } = useUser();
    const { authState } = useAuth();
    const { filterCortesByDate, cortesOfDay, cortesOfWeek, cortesOfMonth, billedToday, billedWeek, billedMonth } = useCortes();
    const { getSales, salesTotalToday, salesTotalWeek, salesTotalMonth } = useSales();
    const isMobileScreen = useMediaQuery('(max-width:1199px)');
    const router = useRouter();

    useEffect(() => {
        firstTime && fetchUser()
    }, [])

    const fetchUser = () => {
        filterCortesByDate()
        getSales()
        setFirstTime(false)
        getUser(authState?.user?.id).then((user) => {
            if (user?.role !== 'owner') {
                router.push('/dashboard')
            } else {
                setIsLoading(false)
            }
        })
    }

    function formatToArgentinianPesos(number) {
        return new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS',
            minimumFractionDigits: 2
        }).format(number);
    }

    const handleDateChange = async (e) => {
        setFilterDate(e.target.value);
        await filterCortesByDate(e.target.value);
    };

    if (isLoading) {
        return (
            <Styled.Container>
                <CircularProgress />
            </Styled.Container>
        )
    }

    return (
        <Styled.Container>
            <Styled.ItemContainer>
                <Styled.StartContainer>
                    <Styled.ColumnContainer>
                        <h2>Facturacion</h2>
                        <br />
                        <Input style={{ maxWidth: 160 }} type="date" value={filterDate} onChange={handleDateChange} />
                        <br />
                        <Space direction={isMobileScreen ? "vertical" : "horizontal"} align='start' size={16}>
                            <Card title="Cortes" style={{ width: '100%', minWidth: 300 }}>
                                <Title level={5}>Cortes de hoy: <Tag color='blue'>{cortesOfDay?.length}</Tag></Title>
                                <Title level={5}>Cortes de la semana: <Tag color='blue'>{cortesOfWeek?.length}</Tag></Title>
                                <Title level={5}>Cortes del mes: <Tag color='blue'>{cortesOfMonth?.length}</Tag></Title>
                            </Card>
                            <Card title="Facturacion (productos)" style={{ width: '100%', minWidth: 300 }}>
                                <Title level={5}>Facturacion de hoy: <Tag color='cyan'>{formatToArgentinianPesos(salesTotalToday)}</Tag></Title>
                                <Title level={5}>Facturacion de la semana: <Tag color='cyan'>{formatToArgentinianPesos(salesTotalWeek)}</Tag></Title>
                                <Title level={5}>Facturacion del mes: <Tag color='cyan'>{formatToArgentinianPesos(salesTotalMonth)}</Tag></Title>
                            </Card>
                            <Card title="Facturacion (cortes)" style={{ width: '100%', minWidth: 300 }}>
                                <Title level={5}>Facturacion de hoy: <Tag color='green'>{formatToArgentinianPesos(billedToday)}</Tag></Title>
                                <Title level={5}>Facturacion de la semana: <Tag color='green'>{formatToArgentinianPesos(billedWeek)}</Tag></Title>
                                <Title level={5}>Facturacion del mes: <Tag color='green'>{formatToArgentinianPesos(billedMonth)}</Tag></Title>
                            </Card>
                        </Space>
                        <br />
                    </Styled.ColumnContainer>
                </Styled.StartContainer>
            </Styled.ItemContainer>
        </Styled.Container>
    )
}
