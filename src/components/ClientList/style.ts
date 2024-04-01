import styled from 'styled-components'

export const ClientCardContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 18px;
  border: 1px solid #4180ab;
  border-radius: 16px;
  @media (max-width: 1199px) {
    flex-direction: column;
  }
  background-color: #efefef;
`

export const Content = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
`

export const Label = styled.label`
  font-family: Montserrat;
  font-size: 14px;
  font-weight: 400;
  text-align: left;
`

export const NameText = styled.label`
  font-family: Montserrat;
  font-size: 14px;
  font-weight: 400;
`

export const Subtitle = styled.label`
  font-family: Montserrat;
  font-size: 14px;
  font-weight: 400;
  color: #717171;
`
export const StartContainer = styled.div`
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 10px;
  gap: 10px;
`

export const InputLogin = styled.input`
  width: 60%;
  border-radius: 16px;
  border: 1px solid #ffffff80;
  border: none;
  padding: 14px;
  font-family: Montserrat;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  outline: none;
  @media (max-width: 1199px) {
    width: 100%;
  }
`
