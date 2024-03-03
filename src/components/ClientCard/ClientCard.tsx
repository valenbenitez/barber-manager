import React from 'react'
import * as Styled from './style'

function ClientCard({ client }: { client: any }) {
    function formatSecondsAndNanosecondsToDate(seconds, nanoseconds) {
        const milliseconds = Math.floor(nanoseconds / 1e6); // Convertir nanosegundos a milisegundos
        const date = new Date(seconds * 1000 + milliseconds);
        return date.toLocaleString(); // Puedes utilizar otras opciones de formato según tus necesidades
    }
    return (
        <Styled.ClientCardContainer>
            <Styled.Content>
                <Styled.Label>
                    {formatSecondsAndNanosecondsToDate(
                        client.createdAt?.seconds,
                        client.createdAt?.nanoseconds,
                    )}
                </Styled.Label>
                <br />
                <br />
                <Styled.NameText>{client.name}</Styled.NameText>
                <Styled.Subtitle>{client.phone}</Styled.Subtitle>
            </Styled.Content>
        </Styled.ClientCardContainer>
    )
}

export default ClientCard