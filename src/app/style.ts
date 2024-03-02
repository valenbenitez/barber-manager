import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  height: 100svh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
`
export const ItemContainer = styled.div`
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 16px;
  border: 1px solid #ffffff80;
  background-color: #e4ebf0;
  padding: 32px 24px 32px 24px;
  gap: 24px;
`
export const Title = styled.label`
  //styleName: Font/Heading 5/Semibold;
  font-family: Montserrat;
  font-size: 24px;
  font-weight: 600;
  line-height: 32px;
  text-align: center;
`
export const InputLogin = styled.input`
  width: 100%;
  border-radius: 16px;
  border: 1px solid #ffffff80;
  border: none;
  padding: 14px;
  font-family: Montserrat;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  outline: none;
`

export const SubmitButton = styled.button`
  width: 60%;
  height: 56px;
  padding: 16px, 24px, 16px, 24px;
  border-radius: 16px;
  gap: 8px;
  border: none;
  background-color: #bdd1de;
  font-family: Montserrat;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
`
