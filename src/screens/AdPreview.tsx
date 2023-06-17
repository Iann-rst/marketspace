import { useState } from 'react'
import { Dimensions, Image, ScrollView, Text, View } from 'react-native'

import { useNavigation, useRoute } from '@react-navigation/native'
import Carousel from 'react-native-reanimated-carousel'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { AxiosError } from 'axios'
import { Button } from '../components/Button'
import { InfoProfile } from '../components/InfoProfile'
import { PaymentsMethods } from '../components/PaymentsMethods'
import { Tag } from '../components/Tag'
import { useAuth } from '../hooks/useAuth'
import { AppNavigatorRoutesProps } from '../routes/app.routes'
import { api } from '../services/api'
import { ProductImagesProps } from './CreateAd'

type AdPreviewProps = {
  name: string
  description: string
  price: string
  images: ProductImagesProps[]
  is_new: boolean
  accept_trade: boolean
  payment_methods: string[]
}

export function AdPreview() {
  const { top } = useSafeAreaInsets()
  const { goBack, navigate } = useNavigation<AppNavigatorRoutesProps>()
  const { params } = useRoute()
  const { user } = useAuth()
  const adPreview = params as AdPreviewProps
  const width = Dimensions.get('window').width
  const [active, setActive] = useState(0)

  const [isLoading, setIsLoading] = useState(false)

  async function handleCreateAd() {
    try {
      setIsLoading(true)
      // enviar as informações para a api
      const product = await api.post('/products', {
        name: adPreview.name,
        description: adPreview.description,
        is_new: adPreview.is_new,
        price: parseInt(adPreview.price),
        accept_trade: adPreview.accept_trade,
        payment_methods: adPreview.payment_methods,
      })

      // Para cada imagem, adicionar no FormData com o campo 'images'
      const product_images = new FormData()

      adPreview.images.forEach((image) => {
        product_images.append('images', image as any)
      })

      product_images.append('product_id', product.data.id)

      await api.post('/products/images', product_images, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      navigate('myAdDetails', {
        id: product.data.id,
      })
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response.data.message)
        return alert(error.response.data.message)
      }
      return alert(
        'Não foi possível publicar o anúncio. Tente novamente mais tarde.',
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <View className="flex-1 bg-gray-200">
      {/* Header */}
      <View
        style={{ paddingTop: top + 36, paddingBottom: 16 }}
        className="items-center justify-center bg-blue-400"
      >
        <Text className="font-title text-base leading-[130%] text-gray-100">
          Pré visualização do anúncio
        </Text>
        <Text className="font-body text-sm leading-[130%] text-gray-100">
          É assim que seu produto vai aparecer!
        </Text>
      </View>

      <ScrollView className="flex-grow" showsVerticalScrollIndicator={false}>
        {/* Carrousel de fotos do produto */}
        <View className="w-full">
          <Carousel
            width={width}
            height={280}
            data={adPreview.images}
            onSnapToItem={(item) => setActive(item)}
            renderItem={({ item }) => (
              <Image
                className="h-full w-full bg-cover"
                source={{ uri: item.uri }}
                alt=""
              />
            )}
          />
          <View className="absolute bottom-0.5 left-0 w-full flex-row space-x-1 px-0.5">
            {adPreview.images!.map((item, index) => (
              <View
                key={item.name}
                className={`h-[3px] flex-1 rounded-full bg-gray-100 ${
                  index === active ? 'opacity-100' : 'opacity-50'
                }`}
              />
            ))}
          </View>
        </View>

        {/* Content - Info da publicação */}
        <View className="flex-1 p-6">
          <InfoProfile name={user.name} userImage={user.avatar} />
          <View className="mt-6 space-y-2">
            <Tag isNew={adPreview.is_new} />

            <View className="flex-row items-center">
              <Text className="flex-1 text-xl font-bold leading-[130%] text-gray-700">
                {adPreview.name}
              </Text>
              <Text className="font-title text-sm leading-[130%] text-blue-400">
                R${` `}
                <Text className="text-xl">{adPreview.price}</Text>
              </Text>
            </View>
            <Text className="font-body text-sm leading-[130%] text-gray-600">
              {adPreview.description}
            </Text>
          </View>

          <View className="mt-6 space-y-4">
            <View className="flex-row space-x-2">
              <Text className="font-title text-sm leading-[130%] text-gray-600">
                Aceita troca?
              </Text>
              <Text className="font-body text-sm leading-[130%] text-gray-600">
                {adPreview.accept_trade ? 'Sim' : 'Não'}
              </Text>
            </View>

            <View className="space-y-2">
              <Text className="font-title text-sm leading-[130%] text-gray-600">
                Meios de pagamento:
              </Text>

              <View>
                <PaymentsMethods payment_methods={adPreview.payment_methods} />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Footer */}
      <View className="h-[90px] flex-row space-x-3 bg-gray-100 px-6 pb-7 pt-5">
        <Button
          className="flex-1"
          title="Voltar e editar"
          icon="arrow"
          variant="light"
          onPress={goBack}
        />
        <Button
          className="flex-1"
          title="Publicar"
          icon="tag"
          onPress={handleCreateAd}
          isLoading={isLoading}
          disabled={isLoading}
        />
      </View>
    </View>
  )
}
