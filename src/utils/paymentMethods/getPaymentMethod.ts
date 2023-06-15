type GetProps = {
  label: string
  checked: boolean
}

export function getPaymentMethod(data: GetProps[]) {
  const response = data.filter((payment) => payment.checked === true)

  const paymentMethods = response.map((payment) => payment.label)

  return paymentMethods
}
