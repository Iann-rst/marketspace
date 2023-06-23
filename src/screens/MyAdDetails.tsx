import { useNavigation, useRoute } from '@react-navigation/native'
import { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { Dimensions, Image, ScrollView, Text, View } from 'react-native'
import Carousel from 'react-native-reanimated-carousel'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import { Button } from '../components/Button'
import { Header } from '../components/Header'
import { InfoProfile } from '../components/InfoProfile'
import { Loading } from '../components/Loading'
import { Overlay } from '../components/Overlay'
import { PaymentsMethods } from '../components/PaymentsMethods'
import { Tag } from '../components/Tag'
import { ProductDTO } from '../dtos/ProductDTO'
import { useAuth } from '../hooks/useAuth'
import { AppNavigatorRoutesProps } from '../routes/app.routes'
import { api } from '../services/api'
import { AppError } from '../utils/error/AppError'
import { mapToStringArray } from '../utils/paymentMethods/getPaymentMethod'

type MyAdDetailsParams = {
  id: string
}

export function MyAdDetails() {
  const { top, bottom } = useSafeAreaInsets()
  const { width } = Dimensions.get('window')
  const { navigate } = useNavigation<AppNavigatorRoutesProps>()
  const { params } = useRoute()
  const { id } = params as MyAdDetailsParams

  const { user } = useAuth()

  const [product, setProduct] = useState<ProductDTO>({} as ProductDTO)
  const [isLoading, setIsLoading] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const [loading, setLoading] = useState(false)

  function handleMyAdsScreen() {
    navigate('app', { screen: 'myAds' })
  }

  async function handleChangeVisibility() {
    try {
      setLoading(true)
      await api.patch(`/products/${id}`, {
        is_active: !product.is_active,
      })

      setProduct((prevState) => ({
        ...prevState,
        is_active: !product.is_active,
      }))
    } catch (error) {
      const isAppError = error instanceof AppError

      const title = isAppError
        ? error.message
        : 'Serviço indisponível no momento.'

      Toast.show({
        text1: 'Anúncio',
        text2: title,
        type: 'error',
        position: 'top',
      })
    } finally {
      setLoading(false)
    }
  }

  async function handleDeleteAd() {
    try {
      await api.delete(`/products/${id}`)
      navigate('app', { screen: 'myAds' })
    } catch (error) {
      if (error instanceof AxiosError) {
        return alert('Não foi possível excluir o anúncio.')
      }
    }
  }

  useEffect(() => {
    async function getAdData() {
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
          text1: 'Anúncio',
          text2: title,
          type: 'error',
          position: 'top',
        })
      }
    }
    getAdData()
  }, [id])

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <Loading />
      </View>
    )
  }

  return (
    <ScrollView
      className="flex-1 bg-gray-200"
      contentContainerStyle={{
        paddingTop: top + 20,
        paddingBottom: bottom + 10,
      }}
      showsVerticalScrollIndicator={false}
    >
      <Header
        iconLeft={true}
        back={handleMyAdsScreen}
        iconRight="edit"
        rightFunction={() => console.log('editar')}
      />

      {/* Carrousel imagens do produto */}
      <View className="mt-3">
        <Carousel
          width={width}
          height={280}
          data={product.product_images}
          onSnapToItem={(item) => setCurrentImageIndex(item)}
          renderItem={({ item }) => (
            <Image
              className="h-full w-full bg-cover"
              source={{ uri: `${api.defaults.baseURL}/images/${item.path}` }}
              alt=""
            />
          )}
        />
        <View className="absolute bottom-0.5 left-0 w-full flex-row space-x-1 px-0.5">
          {product.product_images.map((item, index) => (
            <View
              key={item.id}
              className={`h-1 flex-1 rounded-full  ${
                index === currentImageIndex ? 'bg-black/25' : 'bg-gray-100/50'
              }`}
            />
          ))}
        </View>

        {!product.is_active && <Overlay isCentralized={true} />}
      </View>

      {/* Content - Info da publicação */}
      <View className="flex-1 px-6 pt-6">
        <InfoProfile name={user.name} userImage={user.avatar} />
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

            <View>
              <PaymentsMethods
                payment_methods={mapToStringArray(product.payment_methods)}
              />
            </View>
          </View>
        </View>
      </View>

      <View className="mt-8 space-y-2 p-6">
        <Button
          title={product.is_active ? 'Desativar anúncio' : 'Reativar anúncio'}
          variant={product.is_active ? 'dark' : 'main'}
          icon="power"
          onPress={handleChangeVisibility}
          isLoading={loading}
          disabled={loading}
        />
        <Button
          title="Excluir anúncio"
          variant="light"
          icon="trash"
          onPress={handleDeleteAd}
        />
      </View>
    </ScrollView>
  )
}
