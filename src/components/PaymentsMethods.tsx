import { Bank, Barcode, CreditCard, Money, QrCode } from 'phosphor-react-native'
import { Text, View } from 'react-native'

type PaymentsMethodsProps = {
  payment_methods: string[]
}

export function PaymentsMethods({ payment_methods }: PaymentsMethodsProps) {
  return (
    <>
      {payment_methods.includes('boleto') && (
        <View className="mt-1 flex-row items-center space-x-2">
          <Barcode size={16} />
          <Text className="font-body text-sm leading-[130%] text-gray-600">
            Boleto
          </Text>
        </View>
      )}

      {payment_methods.includes('pix') && (
        <View className="mt-1 flex-row items-center space-x-2">
          <QrCode size={16} />
          <Text className="font-body text-sm leading-[130%] text-gray-600">
            Pix
          </Text>
        </View>
      )}

      {payment_methods.includes('cash') && (
        <View className="mt-1 flex-row items-center space-x-2">
          <Money size={16} />
          <Text className="font-body text-sm leading-[130%] text-gray-600">
            Dinheiro
          </Text>
        </View>
      )}

      {payment_methods.includes('card') && (
        <View className="mt-1 flex-row items-center space-x-2">
          <CreditCard size={16} />
          <Text className="font-body text-sm leading-[130%] text-gray-600">
            Cartão de Crédito
          </Text>
        </View>
      )}

      {payment_methods.includes('deposit') && (
        <View className="mt-1 flex-row items-center space-x-2">
          <Bank size={16} />
          <Text className="font-body text-sm leading-[130%] text-gray-600">
            Depósito Bancário
          </Text>
        </View>
      )}
    </>
  )
}
