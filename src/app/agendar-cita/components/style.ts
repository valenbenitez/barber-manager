import styled from 'styled-components'

export const Option = styled.option`
  font-family: Montserrat;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
`

export const FormSelect = styled.select<any>`
  width: 100%;
  min-width: 150px;
  border-radius: 16px;
  padding: 14px;
  border: 1px solid #ffffff80;
  font-family: Montserrat;
  font-weight: 400;
  font-size: 16px;
  outline: none;
  background-color: #fff;
  @media (max-width: 1199px) {
    width: 100%;
  }
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
  @media (max-width: 1199px) {
    width: 100%;
  }
`
