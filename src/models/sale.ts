export interface Sale {
  id: string
  saleDate: string // ISO date format, e.g., "2024-05-14T15:30:00Z"
  client: Customer
  seller: Seller
  soldProducts: SoldProduct[] | any
  totalSale: number
  paymentMethod: PaymentMethod
}

interface Customer {
  clientId: string
  clientName: string
}

interface Seller {
  sellerId: string
  sellerName: string
}

interface SoldProduct {
  productId: string
  productName: string
  quantitySold: number
  unitPrice: number
}

type PaymentMethod = 'tarjeta de crédito' | 'efectivo' | 'transferencia'
