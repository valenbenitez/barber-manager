import styled from 'styled-components'

export const ItemContainer = styled.div`
  width: 100%;
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

export const Container = styled.div`
  width: 100%;
  min-height: 100svh;
  @media (max-width: 1199px) {
    background-image: url('/wallpapers/new_wallpaper_mobile.png');
    background-size: cover; /* Ajusta el tamaño de la imagen al tamaño del contenedor */
    background-repeat: no-repeat; /* Evita que se repita la imagen de fondo */
    overflow-y: auto;
    overflow-x: auto;
  }
`

export const HeaderContent = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-start;
  @media (max-width: 1199px) {
    padding: var(--spacing-32-px, 32px) 16px 6px 16px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 24px;
  }
`

export const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  padding: 24px 24px;
  border-radius: 24px;
  border: 1px solid var(--beetransfer-border-50, rgba(255, 255, 255, 0.5));
  background: var(--beetransfer-fondo-50, rgba(255, 255, 255, 0.5));
  @media (max-width: 1199px) {
    width: 100%;
    padding: var(--spacing-32-px, 32px) 16px 0px 16px;
    border-radius: 0;
    background: none;
    border: none;
  }
`

// export const ItemContainer = styled.div`
//   width: 100%;
//   display: flex;
//   padding: 18px;
//   flex-direction: column;
//   align-items: center;
//   gap: 24px;
//   align-self: stretch;
//   border-radius: 24px;
//   border: 1px solid var(--beetransfer-border-50, rgba(255, 255, 255, 0.5));
//   background: var(--beetransfer-fondo-50, rgba(255, 255, 255, 0.5));
// `;

// export const NoAccountImage = styled(NextImage).attrs({
//   width: 60,
//   height: 60,
//   alt: 'bank-img',
//   src: '/icons/noaccount.svg',
// })``

export const NewAccountButton = styled.button<any>`
  display: flex;
  padding: 16px 24px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: var(--Border-Radius-16px, 16px);
  background: var(--Color-Button-Bg-Primary, #f5980b);
  color: #fff;
  border: none;
  font-family: Montserrat;
`

export const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 16px;
  gap: 16px;
  position: absolute;
  bottom: 12%;
`

export const AddAccButton = styled.button<any>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
  gap: 8px;
  /* flex: 1 0 0; */
  border-radius: var(--Border-Radius-16px, 16px);
  background: var(--Color-Button-Bg-Primary, #f5980b);
  color: #fff;
  border: none;
  cursor: pointer;
  @media (max-width: 1199px) {
    width: 50%;
  }
`

export const BetweenContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  @media (max-width: 1199px) {
    width: 100%;
  }
`

export const RowContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-direction: row;
  gap: 16px;
`

export const StartContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
`

export const EndContainer = styled.div`
  /* width: 30%; */
  display: flex;
  align-items: center;
  justify-content: center;
`

export const ColumnContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
`

export const CenterContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

export const OptionContainer = styled.div`
  width: 90%;
  padding: 16px;
  gap: 8px;
  border-radius: 24px;
  border: 1px solid #ffffff80;
  opacity: 0px;
  background-color: #ffffff80;
  cursor: pointer;
  margin-top: 10px;
`

export const Label = styled.label`
  font-family: Montserrat;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  text-align: left;
`

export const InputStyle = styled.input<any>`
  padding: 10px;
  border-radius: 14px;
  opacity: 0px;
  outline: none;
  border: 1px solid #ffffff80;
  background-color: #ffffff80;
  font-family: Montserrat;
  font-size: 14px;
  line-height: 24px;
  text-align: left;
  margin-top: 10px;
`

export const SelectStyle = styled.select<any>`
  padding: 10px;
  gap: 4px;
  border-radius: 14px;
  opacity: 0px;
  outline: none;
  border: 1px solid #ffffff80;
  background-color: #ffffff80;
  font-family: Montserrat;
  font-size: 14px;
  line-height: 24px;
  text-align: left;
  margin-top: 10px;
`

export const SubmitButton = styled.button<any>`
  padding: 16px 24px 16px 24px;
  gap: 8px;
  border-radius: 16px;
  opacity: 0px;
  background-color: #f5980b;
  border: none;
  cursor: pointer;
  color: #fff;
  width: 90%;
  margin-top: 10px;
`
