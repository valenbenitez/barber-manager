'use client';
import React from 'react';
import { Space, Button } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';

interface SuccessScreenProps {
    onConfirm: () => void; // Función que se ejecutará al presionar el botón
}

export default function SuccessScreen() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
            <Space direction="vertical" size="large">
                <CheckCircleOutlined style={{ fontSize: '72px', color: '#52c41a' }} />
                <h1>Tu turno fue reservado con éxito</h1>
            </Space>
        </div>
    );
}
