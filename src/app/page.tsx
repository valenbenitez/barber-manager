'use client'
import { useEffect, useState } from 'react';
import * as Styled from './style'
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import Image from 'next/image';

export default function Home() {
  const [state, setState] = useState({
    email: '',
    password: ''
  })
  const { authState } = useAuth();
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (authState?.logged) {
      // Si el usuario  está logueado, redirige a la página de inicio de sesión
      router.push('/dashboard');
    }
  }, [authState, router]);

  function handleChange(e: any) {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  async function handleSignIn() {
    try {
      await auth.signInUserWithEmailAndPassword(state)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Styled.Container className='LoginContainer' >
      <Styled.ItemContainer className='ItemContainer' >
        <Image src={'/logo.jpeg'} width={140} height={140} alt='icon-img' />
        <Styled.Title className='Title' >Bienvenido</Styled.Title>
        <Styled.InputLogin
          name='email'
          placeholder='Correo'
          onChange={handleChange}
          className='InputContainer'
        />
        <Styled.InputLogin
          name='password'
          type='password'
          placeholder='Contrasena'
          onChange={handleChange}
          className='InputContainer'
        />
        <Styled.SubmitButton onClick={handleSignIn} className='SubmitButton'>
          Iniciar Sesion
        </Styled.SubmitButton>
      </Styled.ItemContainer>
    </Styled.Container>
  );
}
