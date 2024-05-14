import styled from 'styled-components'

export const StartContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 4px;
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

export const BetweenContainer = styled.div`
  width: 62%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const ColumnContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

export const ItemContainer = styled.div`
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: 1px solid #ffffff80;
  padding: 32px 24px 32px 24px;
  gap: 24px;
  border-radius: 24px;
  background-color: #bdd1de;
`
export const InputLogin = styled.input`
  width: 62%;
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
export const FormSelect = styled.select<any>`
  width: 62%;
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

export const SubmitButton = styled.button`
  width: 60%;
  height: 56px;
  padding: 16px, 24px, 16px, 24px;
  border-radius: 16px;
  gap: 8px;
  border: none;
  background-color: #4180ab;
  font-family: Montserrat;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  color: #fff;
`
export const Option = styled.option`
  font-family: Montserrat;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
`
