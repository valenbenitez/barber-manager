'use client'
import React, { useState } from 'react';
import * as Styled from './style';
import { Button, Input, Tag } from 'antd';
import { Select } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons'

const { Option } = Select;

const countryCodes = [
    { code: '+54', flag: '🇦🇷' }, // Argentina
    { code: '+1', flag: '🇺🇸' }, // United States
    { code: '+44', flag: '🇬🇧' }, // United Kingdom
    { code: '+34', flag: '🇪🇸' }, // Spain
    { code: '+52', flag: '🇲🇽' }, // Mexico
    { code: '+55', flag: '🇧🇷' }, // Brazil
    { code: '+57', flag: '🇨🇴' }, // Colombia
    { code: '+58', flag: '🇻🇪' }, // Venezuela
    { code: '+33', flag: '🇫🇷' }, // France
    { code: '+49', flag: '🇩🇪' }, // Germany
    // Añade más países y códigos aquí
];

interface UserInfoProps {
    clientInfo: any;
    setClientInfo: any;
    setScreen: any;
}

export default function UserInfo({ clientInfo, setClientInfo, setScreen }: UserInfoProps) {
    const [countryCode, setCountryCode] = useState('+54');

    const handleChange = (e: any) => {
        const value = e.target.value;
        const name = e.target.name;

        setClientInfo({
            ...clientInfo,
            [name]: value
        })
    }

    const handleCountryCode = (e) => {
        const value = e;
        setCountryCode(value);
    }

    const handleSubmit = () => {
        setClientInfo({
            ...clientInfo,
            phone: `${countryCode}${clientInfo.phone}`
        })
        setScreen('summary')
    }

    return (
        <div>
            <label>Nombre completo:</label>
            <Input placeholder="Ejemplo: Lionel Messi" name='name' onChange={handleChange} />
            <br />
            <br />
            <label>Numero de telefono:</label>
            <div>
                <Select
                    showSearch
                    placeholder="Selecciona un código de país"
                    optionFilterProp="children"
                    onChange={handleCountryCode}
                    style={{ width: '30%' }}
                >
                    {countryCodes.map(({ code, flag }) => (
                        <Option key={code} value={code}>
                            {`${flag} ${code}`}
                        </Option>
                    ))}
                </Select>
                <Input style={{ width: '70%' }} placeholder="Ejemplo: 1122334455" name='phone' onChange={handleChange} />
            </div>
            <br />
            <InfoCircleOutlined />
            <label>
                Te enviaremos la confirmacion por WhatsApp
            </label>
            <br />
            <br />
            <Button style={{ width: '100%' }} type='primary' onClick={handleSubmit}>Siguiente</Button>
        </div>
    )
}
