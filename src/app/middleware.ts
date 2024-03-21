import { useUser } from '@/hooks/useUser'
import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  async function middleware(req) {
    const { user } = useUser()
    console.log('ASDAS')
    const isAuthenticated = user?.role === 'owner'
    const authRoutes = ['/signin', '/registrar-corte']
    if (authRoutes.includes(req.nextUrl.pathname) && isAuthenticated) {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }

    if (!authRoutes.includes(req.nextUrl.pathname) && !isAuthenticated) {
      return NextResponse.redirect(new URL('/signin', req.url))
    }
  },
  {
    callbacks: {
      authorized: () => true,
    },
  }
)

export const config = {
  matcher: ['/signin', '/dashboard', '/registrar-corte', '/registrar-barbero', '/facturacion', '/registrar-producto'],
}
