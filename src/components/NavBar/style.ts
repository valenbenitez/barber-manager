import styled from 'styled-components'

export const Container = styled.div`
  display: flex; /* Habilita Flexbox */
  height: 100vh;
`

export const Sidebar = styled.div`
  height: 100%;
  width: 200px; /* Ancho fijo de la barra lateral */
  background-color: #333; /* Color de fondo de la barra lateral */
  color: white; /* Color de texto */
  overflow-y: auto;
`
