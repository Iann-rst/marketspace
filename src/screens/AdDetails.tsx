import { useEffect, useState } from 'react'
import { Dimensions, Image, ScrollView, Text, View } from 'react-native'
import Carousel from 'react-native-reanimated-carousel'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { useNavigation, useRoute } from '@react-navigation/native'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import { Button } from '../components/Button'
import { Header } from '../components/Header'
import { InfoProfile } from '../components/InfoProfile'
import { Loading } from '../components/Loading'
import { PaymentsMethods } from '../components/PaymentsMethods'
import { Tag } from '../components/Tag'
import { ProductDTO } from '../dtos/ProductDTO'
import { AppNavigatorRoutesProps } from '../routes/app.routes'
import { api } from '../services/api'
import { AppError } from '../utils/error/AppError'
import { mapToStringArray } from '../utils/paymentMethods/getPaymentMethod'

interface AdDetailsParams {
  id: string
}

export function AdDetails() {
  const { bottom, top } = useSafeAreaInsets()
  const width = Dimensions.get('window').width

  const { navigate } = useNavigation<AppNavigatorRoutesProps>()
  const { params } = useRoute()
  const { id } = params as AdDetailsParams

  const [active, setActive] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [product, setProduct] = useState<ProductDTO>({} as ProductDTO)

  function handleGoHomeScreen() {
    navigate('app')
  }

  useEffect(() => {
    async function getAdDetails() {
      try {
        const response = await api.get(`/products/${id}`)

        setProduct(response.data)
        setIsLoading(false)
      } catch (error) {
        const isAppError = error instanceof AppError

        const title = isAppError
          ? error.message
          : 'Não foi possível buscar as informações do anúncio. Tente novamente mais tarde'

        Toast.show({
          text1: 'Detalhes do Anúncio',
          text2: title,
          type: 'error',
          position: 'top',
        })
      }
    }

    getAdDetails()
  }, [id])

  return (
    <>
      {isLoading ? (
        <View className="flex-1 items-center justify-center bg-gray-200">
          <Loading />
        </View>
      ) : (
        <ScrollView
          className="flex-grow bg-gray-200"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingTop: top + 20,
            paddingBottom: bottom,
          }}
        >
          <View className="flex-1">
            <Header back={handleGoHomeScreen} />

            {/* Carousel das Imagens do produto */}
            <View className="mt-3  w-full">
              <Carousel
                width={width}
                height={280}
                data={product.product_images}
                onSnapToItem={(item) => setActive(item)}
                renderItem={({ item }) => (
                  <Image
                    className="h-full w-full bg-cover"
                    source={{
                      uri: `${api.defaults.baseURL}/images/${item.path}`,
                    }}
                    alt=""
                  />
                )}
              />
              <View className="absolute bottom-0.5 left-0 w-full flex-row space-x-1 px-0.5">
                {product.product_images.map((item, index) => (
                  <View
                    key={item.id}
                    className={`h-[3px] flex-1 rounded-full bg-gray-100 ${
                      index === active ? 'opacity-100' : 'opacity-50'
                    }`}
                  />
                ))}
              </View>
            </View>

            {/* Content - Info da publicação */}
            <View className="flex-1 p-6">
              <InfoProfile
                name={product.user.name}
                userImage={product.user.avatar}
              />
              <View className="mt-6 space-y-2">
                <Tag isNew={product.is_new} />

                <View className="flex-row items-center">
                  <Text className="flex-1 text-xl font-bold leading-[130%] text-gray-700">
                    {product.name}
                  </Text>
                  <Text className="font-title text-sm leading-[130%] text-blue-400">
                    R${` `}
                    <Text className="text-xl">
                      {parseFloat(product.price).toFixed(2)}
                    </Text>
                  </Text>
                </View>
                <Text className="font-body text-sm leading-[130%] text-gray-600">
                  {product.description}
                </Text>
              </View>

              <View className="mt-6 space-y-4">
                <View className="flex-row space-x-2">
                  <Text className="font-title text-sm leading-[130%] text-gray-600">
                    Aceita troca?
                  </Text>
                  <Text className="font-body text-sm leading-[130%] text-gray-600">
                    {product.accept_trade ? 'Sim' : 'Não'}
                  </Text>
                </View>

                <View className="space-y-2">
                  <Text className="font-title text-sm leading-[130%] text-gray-600">
                    Meios de pagamento:
                  </Text>

                  <View className="space-y-1">
                    <PaymentsMethods
                      payment_methods={mapToStringArray(
                        product.payment_methods,
                      )}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Footer */}
          <View className="mt-8 flex-row items-center justify-between bg-gray-100 p-6">
            <Text className="font-title text-sm leading-[130%] text-blue-700">
              R${` `}
              <Text className="text-2xl">
                {parseFloat(product.price).toFixed(2)}
              </Text>
            </Text>

            <Button title="Entrar em contato" icon="whatsapp" />
          </View>
        </ScrollView>
      )}
    </>
  )
}
