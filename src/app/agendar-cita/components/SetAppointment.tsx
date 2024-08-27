"use client";
import React from 'react';
import { DatePicker, Select, Button, Space } from 'antd';
import { Timestamp } from 'firebase/firestore'; // Asegúrate de importar Firebase

const { Option } = Select;

interface SetAppointmentProps {
    serviceType: string;
    selectedDate: any;
    setSelectedDate: any;
    selectedTime: any;
    setSelectedTime: any;
    setScreen: any;
}

export default function SetAppointment({ serviceType, selectedDate, selectedTime, setSelectedDate, setSelectedTime, setScreen }: SetAppointmentProps) {

    const handleDateChange = (date) => {
        // Convertir el objeto moment a un Date nativo de JavaScript
        setSelectedDate(date.toDate());
    };

    const handleTimeChange = (value) => {
        setSelectedTime(value);
    };

    const handleSubmit = () => {
        if (selectedDate && selectedTime) {
            const [hour, minute] = selectedTime.split(':').map(Number);

            // Crear un nuevo Date basado en la fecha seleccionada y la hora seleccionada
            const selectedDateTime = new Date(selectedDate);
            selectedDateTime.setHours(hour, minute, 0, 0); // Establecer horas y minutos

            // Convertir a Firebase Timestamp
            const firebaseTimestamp = Timestamp.fromDate(selectedDateTime);
            console.log('Firebase Timestamp:', firebaseTimestamp);

            setScreen('userInfo');
        } else {
            console.log('Please select both date and time');
        }
    };

    const generateTimeOptions = () => {
        const times: any = [];
        for (let hour = 9; hour <= 20; hour++) {
            times.push(`${hour}:00`);
            times.push(`${hour}:30`);
        }
        return times;
    };

    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Space direction="vertical" size={12} style={{ width: '100%', maxWidth: '300px' }}>
                <DatePicker
                    placeholder='Selecciona una fecha'
                    onChange={handleDateChange}
                    // disabledDate={(current) => current && current < new Date()}
                    style={{ width: '100%' }}
                />
                <Select
                    placeholder="Selecciona una hora"
                    onChange={handleTimeChange}
                    disabled={!selectedDate}
                    style={{ width: '100%' }}
                >
                    {generateTimeOptions().map((time) => (
                        <Option key={time} value={time}>
                            {time}
                        </Option>
                    ))}
                </Select>
                {selectedDate && selectedTime && (
                    <label>Fecha y Hora Seleccionada: <br /><b> {selectedDate.toISOString().split('T')[0]} a las {selectedTime}</b></label>
                )}
                <Button type="primary" onClick={handleSubmit} style={{ width: '100%' }}>
                    Siguiente
                </Button>
            </Space>
        </div>
    )
}
