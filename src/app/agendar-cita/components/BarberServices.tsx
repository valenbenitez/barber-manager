import { Button } from 'antd';
import React from 'react'

interface SetBarberServicesProps {
    serviceType: string;
    setDescriptionService: any;
    setScreen: any;
}

export default function SetBarberServices({ serviceType, setDescriptionService, setScreen }: SetBarberServicesProps) {

    const handleChange = (screen: string, description: string) => {
        setScreen(screen)
        setDescriptionService(description)
    }

    return (
        <>
            <Button style={buttonStyle} type="primary" icon={'✂️'} size={'large'} onClick={() => handleChange('setPersonal', 'Corte')}>Corte</Button>
            <Button style={buttonStyle} type="primary" icon={'💇‍♂️'} size={'large'} onClick={() => handleChange('setPersonal', 'Corte + barba')}>Corte + barba</Button>
            <Button style={buttonStyle} type="primary" icon={'🧔‍♂️'} size={'large'} onClick={() => handleChange('setPersonal', 'Barba')}>Barba</Button>
        </>
    )
}

const buttonStyle = { width: '80%', marginBottom: '10px' }

