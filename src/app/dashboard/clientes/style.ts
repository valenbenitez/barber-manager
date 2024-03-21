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
  //styleName: Font/Heading 6/Semibold;
  font-family: Montserrat;
  font-size: 20px;
  font-weight: 600;
  line-height: 30px;
  text-align: left;
`
