import { useState } from 'react'
import { Dimensions, Image, ScrollView, Text, View } from 'react-native'
import Carousel from 'react-native-reanimated-carousel'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { Bank, Barcode, CreditCard, Money, QrCode } from 'phosphor-react-native'
import { Button } from '../components/Button'
import { Header } from '../components/Header'
import { InfoProfile } from '../components/InfoProfile'
import { Tag } from '../components/Tag'

export function AdDetails() {
  const { bottom, top } = useSafeAreaInsets()

  const [active, setActive] = useState(0)
  const width = Dimensions.get('window').width

  const carousel = [
    {
      id: 1,
      image: 'https://github.com/Iann-rst.png',
    },
    {
      id: 2,
      image: 'https://github.com/Iann-rst.png',
    },
    {
      id: 3,
      image: 'https://github.com/Iann-rst.png',
    },
  ]

  return (
    <ScrollView
      className="flex-1 bg-gray-200"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingTop: top, paddingBottom: bottom }}
    >
      <View className="flex-1">
        <Header />

        {/* Carousel das Imagens do produto */}
        <View className="mt-3  w-full">
          <Carousel
            width={width}
            height={280}
            data={carousel}
            onSnapToItem={(item) => setActive(item)}
            renderItem={({ item }) => (
              <Image
                className="h-full w-full bg-cover"
                source={{ uri: item.image }}
                alt=""
              />
            )}
          />
          <View className="absolute bottom-0.5 left-0 w-full flex-row space-x-1 px-0.5">
            {carousel.map((item, index) => (
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
          <InfoProfile />
          <View className="mt-6 space-y-2">
            <Tag />

            <View className="flex-row items-center">
              <Text className="flex-1 text-xl font-bold leading-[130%] text-gray-700">
                Bicicleta
              </Text>
              <Text className="font-title text-sm leading-[130%] text-blue-400">
                R${` `}
                <Text className="text-xl">120,00</Text>
              </Text>
            </View>
            <Text className="font-body text-sm leading-[130%] text-gray-600">
              Cras congue cursus in tortor sagittis placerat nunc, tellus arcu.
              Vitae ante leo eget maecenas urna mattis cursus. Mauris metus amet
              nibh mauris mauris accumsan, euismod. Aenean leo nunc, purus
              iaculis in aliquam.
            </Text>
          </View>

          <View className="mt-6 space-y-4">
            <View className="flex-row space-x-2">
              <Text className="font-title text-sm leading-[130%] text-gray-600">
                Aceita troca?
              </Text>
              <Text className="font-body text-sm leading-[130%] text-gray-600">
                Sim
              </Text>
            </View>

            <View className="sapce-y-2">
              <Text className="font-title text-sm leading-[130%] text-gray-600">
                Meios de pagamento:
              </Text>

              <View className="space-y-1">
                <View className="flex-row items-center space-x-2">
                  <Barcode size={16} />
                  <Text className="font-body text-sm leading-[130%] text-gray-600">
                    Boleto
                  </Text>
                </View>

                <View className="flex-row items-center space-x-2">
                  <QrCode size={16} />
                  <Text className="font-body text-sm leading-[130%] text-gray-600">
                    Pix
                  </Text>
                </View>

                <View className="flex-row items-center space-x-2">
                  <Money size={16} />
                  <Text className="font-body text-sm leading-[130%] text-gray-600">
                    Dinheiro
                  </Text>
                </View>

                <View className="flex-row items-center space-x-2">
                  <CreditCard size={16} />
                  <Text className="font-body text-sm leading-[130%] text-gray-600">
                    Cartão de Crédito
                  </Text>
                </View>

                <View className="flex-row items-center space-x-2">
                  <Bank size={16} />
                  <Text className="font-body text-sm leading-[130%] text-gray-600">
                    Depósito Bancário
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View className="flex-row items-center justify-between bg-gray-100 p-6">
          <Text className="font-title text-sm leading-[130%] text-blue-700">
            R${` `}
            <Text className="text-2xl">120,00</Text>
          </Text>

          <Button title="Entrar em contato" icon="whatsapp" />
        </View>
      </View>
    </ScrollView>
  )
}
