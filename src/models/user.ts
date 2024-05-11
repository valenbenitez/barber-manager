export interface User {
  createdAt: Date
  email?: string
  id: string
  name: string
  phone: string
  role: 'owner' | 'employee' | 'client'
  type: 'barberia' | 'peluqueria' | 'belleza' | 'none'
  available?: boolean
}
