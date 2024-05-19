import React, { useEffect, useState } from "react";
import {
    Button,
    Col,
    DatePicker,
    Drawer,
    Form,
    Input,
    Row,
    Select,
    Space,
    TimePicker,
} from "antd";
import { useAppointments } from "@/hooks/useAppointments";
import { useUser } from "@/hooks/useUser";

const initialAppointment = {
    barberId: "",
    barberName: "",
    appointmentDate: "",
    type: "",
    description: "",
};

const services = [
    { value: "barberia", label: "Barberia" },
    { value: "peluqueria", label: "Peluqueria" },
    { value: "belleza", label: "Belleza" },
];

const UpdateAppointment = ({
    open,
    setOpen,
    appointmentId,
}: {
    open: boolean;
    setOpen: any;
    appointmentId: string;
}) => {
    const [appointment, setAppointment] = useState<any>(initialAppointment);
    const [personalSelected, setPersonalSelected] = useState<any>({});
    const [employees, setEmployees] = useState<any>([]);
    const [serviceSelected, setServiceSelected] = useState<any>("");
    const [description, setDescription] = useState<any>("");
    const [selectedDate, setSelectedDate] = useState<any>(null);
    const { updateAppointment, getAppointmentById } = useAppointments();
    const { getUsersByRole, getUserById } = useUser();

    useEffect(() => {
        fetchData();
    }, [appointmentId]);

    useEffect(() => { }, [serviceSelected]);

    const fetchData = async () => {
        if (appointmentId) {
            const appointment = await getAppointmentById(appointmentId);
            setServiceSelected(appointment.type);
            setDescription(appointment.description);
            handleSellerSelected(appointment.barberId);
            setAppointment(appointment);
        }
        const employeesArray: any = [];
        const employeesData = await getUsersByRole("employee");
        if (Array.isArray(employeesData)) {
            employeesData.forEach((client) => {
                employeesArray.push({ value: client.id, label: client.name });
            });
        }
        setEmployees(employeesArray);
    };

    const handleSellerSelected = async (userId: string) => {
        const user = await getUserById(userId);
        setPersonalSelected(user);
    };

    const onClose = () => {
        setOpen(false);
    };

    const handleChangeService = async (e: any) => {
        setServiceSelected(e);
    };

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
        newDate.setHours(
            newTime.getHours(),
            newTime.getMinutes(),
            newTime.getSeconds(),
        );
        setSelectedDate(newDate);
        onClose()
    };

    const handleDescription = async (e: any) => {
        setDescription(e.target.value)
    }

    async function handleSubmit() {
        const newAppointmentDate = selectedDate === null ? appointment.appointmentDate : selectedDate;
        await updateAppointment(appointment.id,
            {
                barberId: personalSelected.id,
                barberName: personalSelected.name,
                description: description,
                type: serviceSelected,
                appointmentDate: newAppointmentDate
            }
        )
    }

    return (
        <>
            <Drawer
                title="Reprogramar cita"
                width={720}
                onClose={onClose}
                open={open}
                extra={
                    <Space>
                        <Button onClick={onClose}>Cancelar</Button>
                        <Button onClick={handleSubmit} type="primary">
                            Guardar
                        </Button>
                    </Space>
                }
            >
                <label>
                    Cliente: <b>{appointment?.clientName}</b>
                </label>
                <br />
                <br />
                <Form layout="vertical">
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label="Personal:"
                                rules={[
                                    { required: true, message: "Please select a personal" },
                                ]}
                            >
                                <Select
                                    style={{ width: "100%" }}
                                    onChange={handleSellerSelected}
                                    placeholder="Seleccionar personal"
                                    options={employees}
                                    value={personalSelected.name}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Servicio:"
                                rules={[{ required: true, message: "Please select a service" }]}
                            >
                                <Select
                                    style={{ width: "100%" }}
                                    onChange={handleChangeService}
                                    placeholder="Seleccionar servicio"
                                    options={services}
                                    value={serviceSelected}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="date"
                                label="Reprogramar Fecha"
                                rules={[
                                    {
                                        required: true,
                                        message: "Por favor selecciona una fecha!",
                                    },
                                ]}
                            >
                                <DatePicker
                                    onChange={handleDateChange}
                                    placeholder="Seleccionar fecha"
                                />
                                <TimePicker
                                    format="HH:mm"
                                    minuteStep={15} // Puedes ajustar el intervalo de minutos
                                    onChange={handleTimeChange}
                                    placeholder="Seleccionar horario"
                                />
                                <p style={{ fontSize: '10px', color: 'lightslategray' }}>* En el caso que se modifique solo el horario o dia, se debe seleccionar ambas opciones nuevamente</p>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                label="Descripcion"
                                rules={[
                                    {
                                        required: true,
                                        message: 'please enter url description',
                                    },
                                ]}
                            >
                                <Input.TextArea rows={4} placeholder="please enter url description" onChange={handleDescription} value={description} />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Drawer>
        </>
    );
};

export default UpdateAppointment;
