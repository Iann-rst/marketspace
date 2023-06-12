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
  price: string
  is_new: boolean
  accept_trade: boolean
  product_images: ProductImagesDTO[]
  payment_methods: PaymentMethodsDTO[]
  user?: {
    avatar: string
  }
}
