import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`
export const ItemContainer = styled.div`
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: 1px solid #ffffff80;
  padding: 16px;
  gap: 24px;
  border-radius: 24px;
  background-color: #bdd1de;
`

export const RowContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
`

export const StartContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`

export const ColumnContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

export const Title = styled.label`
  //styleName: Font/Heading 4/Bold;
  font-family: Montserrat;
  font-size: 30px;
  font-weight: 700;
  line-height: 38px;
  letter-spacing: 0em;
  text-align: center;
`

export const Subtitle = styled.label`
  //styleName: Font/Small/Medium;
  font-family: Montserrat;
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
  letter-spacing: 0em;
  text-align: center;
`

export const Label = styled.label`
  font-family: Montserrat;
  font-size: 14px;
  font-weight: bold;
  @media (max-width: 1199px) {
    font-size: 12px;
    font-weight: 400;
  }
`
export const ClientsContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  @media (max-width: 1199px) {
    flex-direction: column;
  }
`
