export interface Corte {
  barberId: string
  barberName: string
  clientName: string
  clientPhone: string
  completedDate?: Date
  createdDate: Date
  extras: any[]
  id: string
  price: string
  status: 'En espera' | 'En proceso' | 'Terminado'
  toCollect?: boolean
  type: 'barberia' | 'peluqueria' | 'belleza'
}
