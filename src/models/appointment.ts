export interface Appointment {
  barberId?: string
  barberName?: string
  clientId: string
  clientName: string
  clientPhone: string
  completedDate?: Date
  createdDate: Date
  appointmentDate: Date
  extras?: any[]
  id: string
  price?: string
  type: 'barberia' | 'peluqueria' | 'belleza'
  description?: string
}
