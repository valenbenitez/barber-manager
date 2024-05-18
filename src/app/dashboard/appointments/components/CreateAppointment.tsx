import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space, TimePicker } from 'antd';
import { useAppointments } from '@/hooks/useAppointments';
import { useUser } from '@/hooks/useUser';
import { v4 as uuidv4 } from 'uuid';

const { Option } = Select;

const services = [{ value: 'barberia', label: 'Barberia' }, { value: 'peluqueria', label: 'Peluqueria' }, { value: 'belleza', label: 'Belleza' }]

export default function CreateAppointment({ open, setOpen }: { open: boolean, setOpen: any }) {
    const [clients, setClients] = useState<any>([])
    const [employees, setEmployees] = useState<any>([])
    const [clientSelected, setClient] = useState<any>({})
    const [personalSelected, setPersonalSelected] = useState<any>({})
    const [serviceSelected, setServiceSelected] = useState<any>('')
    const [description, setDescription] = useState<any>('')
    const [selectedDate, setSelectedDate] = useState<any>(null);
    const { createAppointment } = useAppointments();
    const { getUsersByRole, getUserById } = useUser();

    useEffect(() => {
        fetchPersonal()
    }, [])

    const fetchPersonal = async () => {
        const clientsArray: any = []
        const employeesArray: any = []
        const clientsData = await getUsersByRole('client')
        const employeesData = await getUsersByRole('employee')
        if (Array.isArray(clientsData)) {
            clientsData.forEach(client => {
                clientsArray.push({ value: client.id, label: client.name });
            });
        }
        if (Array.isArray(employeesData)) {
            employeesData.forEach(client => {
                employeesArray.push({ value: client.id, label: client.name });
            });
        }
        setClients(clientsArray)
        setEmployees(employeesArray)
    }

    const onClose = () => {
        setOpen(false);
    };

    const handleClientSelected = async (userId: string) => {
        if (userId[0]) {
            const user = await getUserById(userId[0])
            setClient(user)
        }
    }

    const handleSellerSelected = async (userId: string) => {
        const user = await getUserById(userId)
        setPersonalSelected(user)
    }

    const handleChangeService = async (e: any) => {
        setServiceSelected(e)
    }

    const handleDescription = async (e: any) => {
        setDescription(e.target.value)
    }

    // Manejador de cambio para DatePicker
    const handleDateChange = (date) => {
        if (!date) {
            // Si no se selecciona ninguna fecha, limpiamos el estado
            setSelectedDate(null);
            return;
        }
        const newDate = date.toDate(); // Convertir el momento seleccionado a objeto Date
        // Si ya existe una hora, ajustamos esa hora en la nueva fecha
        if (selectedDate) {
            newDate.setHours(selectedDate.getHours());
            newDate.setMinutes(selectedDate.getMinutes());
            newDate.setSeconds(selectedDate.getSeconds());
        }
        setSelectedDate(newDate);
    };

    // Manejador de cambio para TimePicker
    const handleTimeChange = (time) => {
        if (!time) {
            // Si no se selecciona ninguna hora, no ajustamos la hora en la fecha
            if (selectedDate) {
                const newDate = new Date(selectedDate);
                newDate.setHours(0, 0, 0, 0); // Resetear hora a medianoche
                setSelectedDate(newDate);
            }
            return;
        }
        const newTime = time.toDate(); // Convertir el momento seleccionado a objeto Date
        const newDate = selectedDate ? new Date(selectedDate) : new Date(); // Usar la fecha seleccionada o la fecha actual
        newDate.setHours(newTime.getHours(), newTime.getMinutes(), newTime.getSeconds());
        setSelectedDate(newDate);
    };

    const submitForm = async () => {
        console.log(selectedDate);
        const postAppointment = {
            id: uuidv4(),
            clientId: clientSelected.id,
            clientName: clientSelected.name,
            clientPhone: clientSelected.phone,
            barberId: personalSelected.id,
            barberName: personalSelected.name,
            createdDate: new Date(),
            appointmentDate: selectedDate,
            type: serviceSelected,
            description: description
        }
        await createAppointment(postAppointment)
        setClient({})
        setPersonalSelected({})
        setDescription('')
        setSelectedDate(null)
        setOpen(false)
    };

    return (
        <>
            <Drawer
                title="Registrar turno"
                width={720}
                onClose={onClose}
                open={open}
                styles={{
                    body: {
                        paddingBottom: 80,
                    },
                }}
                extra={
                    <Space>
                        <Button onClick={onClose}>Cancelar</Button>
                        <Button onClick={submitForm} type="primary">
                            Guardar
                        </Button>
                    </Space>
                }
            >
                <Form layout="vertical" hideRequiredMark>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="personal"
                                label="Personal:"
                                rules={[{ required: true, message: 'Please select a personal' }]}
                            >
                                <Select
                                    style={{ width: '100%' }}
                                    onChange={handleSellerSelected}
                                    placeholder='Seleccionar personal'
                                    options={employees}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="servicio"
                                label="Servicio:"
                                rules={[{ required: true, message: 'Please select a service' }]}
                            >
                                <Select
                                    style={{ width: '100%' }}
                                    onChange={handleChangeService}
                                    placeholder='Seleccionar servicio'
                                    options={services}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="cliente"
                                label="Cliente:"
                                rules={[{ required: true, message: 'Please select a client' }]}
                            >
                                <Select
                                    style={{ width: '100%' }}
                                    onChange={handleClientSelected}
                                    placeholder='Seleccionar cliente'
                                    options={clients}
                                    mode="multiple"
                                    allowClear
                                    optionFilterProp='label'
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="date"
                                label="Fecha"
                                rules={[{ required: true, message: 'Por favor selecciona una fecha!' }]}
                            >
                                <DatePicker onChange={handleDateChange} placeholder='Seleccionar fecha' />
                                <TimePicker
                                    format="HH:mm"
                                    minuteStep={15}  // Puedes ajustar el intervalo de minutos
                                    onChange={handleTimeChange}
                                    placeholder='Seleccionar horario'
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>

                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="description"
                                label="Description"
                                rules={[
                                    {
                                        required: true,
                                        message: 'please enter url description',
                                    },
                                ]}
                            >
                                <Input.TextArea rows={4} placeholder="please enter url description" onChange={handleDescription} />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Drawer>
        </>
    );
};
