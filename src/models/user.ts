export interface User {
  createdAt: Date
  role: 'barber' | 'owner' | 'client'
  name: string
  phone: string
  id: string
  email?: string
}
