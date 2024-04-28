import React from 'react'
import * as Styled from '../style'
import BarberStatus from '@/components/BarberStatus/BarberStatus'
import ShaveCard from '@/components/ShaveCard/ShaveCard'

export default function BarberiaInfo() {
    return (
        <>
            <h4>Disponibilidad barberos</h4>
            <BarberStatus />
            <br />
            <Styled.StartContainer>
                <label>Cortes en proceso:</label>
            </Styled.StartContainer>
            <ShaveCard status="En proceso" />
            <Styled.StartContainer>
                <label>Cortes en espera:</label>
            </Styled.StartContainer>
            <ShaveCard status="En espera" />
            <Styled.StartContainer>
                <label>Cortes terminados:</label>
            </Styled.StartContainer>
            <ShaveCard status="Terminado" />
        </>
    )
}
