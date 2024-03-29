import { UserDTO } from './UserDTO'

export type ProductImagesDTO = {
  path: string
  id: string
}

export type PaymentMethodsDTO = {
  key: string
  name: string
}

export type ProductDTO = {
  id: string
  name: string
  description: string
  price: string
  is_new: boolean
  is_active: boolean
  accept_trade: boolean
  product_images: ProductImagesDTO[]
  payment_methods: PaymentMethodsDTO[]
  user?: UserDTO
}
