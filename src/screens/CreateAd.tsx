import { useNavigation } from '@react-navigation/native'
import { Plus, XCircle } from 'phosphor-react-native'
import { useState } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Header } from '../components/Header'
import { Input } from '../components/Input'
import { AppNavigatorRoutesProps } from '../routes/app.routes'

export function CreateAd() {
  const { bottom, top } = useSafeAreaInsets()
  const [productImages, setProductImages] = useState([])

  const { navigate } = useNavigation<AppNavigatorRoutesProps>()

  function handleBackScreen() {
    navigate('app')
  }

  return (
    <View
      style={{ paddingTop: top + 20, paddingBottom: bottom }}
      className="flex-1 bg-gray-200"
    >
      <Header title="Criar anúncio" back={handleBackScreen} />
      <View className="mt-6 flex-1 px-6">
        <View>
          <Text className="font-title text-base leading-[130%] text-gray-600">
            Imagens
          </Text>
          <Text className="font-body text-sm leading-[130%] text-gray-500">
            Escolha até 3 imagens para mostrar o quando o seu produto é
            incrivel!
          </Text>
        </View>

        <View className="mt-4 flex-row space-x-2">
          {productImages.map((item) => (
            <View key={item}>
              <Image
                className="h-[100px] w-[100px] rounded-md bg-cover"
                source={{ uri: 'https://github.com/Iann-rst.png' }}
                alt=""
              />

              <TouchableOpacity
                className="absolute right-1 top-1 h-4 w-4"
                activeOpacity={0.6}
              >
                <XCircle size={16} weight="fill" color="#3e3a40" />
              </TouchableOpacity>
            </View>
          ))}

          {productImages.length < 3 && (
            <TouchableOpacity
              className="h-[100px] w-[100px] items-center justify-center rounded-md bg-gray-300"
              activeOpacity={0.6}
            >
              <Plus size={24} color="#9F9BA1" />
            </TouchableOpacity>
          )}
        </View>

        <View className="mt-8 space-y-4">
          <Text className="font-title text-base leading-[130%] text-gray-600">
            Sobre o produto
          </Text>

          <Input placeholder="Título do anúncio" />
          <Input
            placeholder="Descrição do produto"
            multiline={true}
            className="h-40"
            textAlignVertical="top"
          />
          {/* TODO: Falta implementar os radios button */}
        </View>

        <View className="mt-8">
          <Text className="font-title text-base leading-[130%] text-gray-600">
            Venda
          </Text>
        </View>
      </View>
    </View>
  )
}
