'use client'
import { useEffect, useState } from 'react';
import * as Styled from './style'
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import Image from 'next/image';
import Link from 'next/link';

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
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }} >
          <label style={{ color: '#4E4B64', fontWeight: '400', fontSize: '12px', fontFamily: 'Montserrat' }} >Diseñado y desarrollado por <Link href={'https://www.instagram.com/primebit.ar/'} target="_blank"><b><u>PrimeBit</u></b></Link></label>
        </div>
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
