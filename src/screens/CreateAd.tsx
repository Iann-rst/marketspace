/* eslint-disable no-useless-return */
import { useNavigation } from '@react-navigation/native'
import Checkbox from 'expo-checkbox'
import * as ImagePicker from 'expo-image-picker'
import { Plus, XCircle } from 'phosphor-react-native'
import { useState } from 'react'
import {
  Image,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'

import { getPaymentMethod } from '../utils/paymentMethods/getPaymentMethod'

import { Header } from '../components/Header'
import { Input } from '../components/Input'
import { AppNavigatorRoutesProps } from '../routes/app.routes'

import { Toast } from 'react-native-toast-message/lib/src/Toast'
import { Button } from '../components/Button'
import { RadioButton } from '../components/RadioButton'
import { ValueInput } from '../components/ValueInput'
import { theme } from '../theme'
import {
  FormDataCreateAdProps,
  createAdSchemaValidation,
} from '../utils/schema/CreateAd'

export type ProductImagesProps = {
  name: string
  uri: string
  type: string
}

export function CreateAd() {
  const { colors } = theme
  const { bottom, top } = useSafeAreaInsets()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataCreateAdProps>({
    resolver: zodResolver(createAdSchemaValidation),
  })

  const [isTrade, setIsTrade] = useState(false)
  const [productImages, setProductImages] = useState<ProductImagesProps[]>([])
  const [options, setOptions] = useState<string | null>(null)

  const [checkBoxes, setCheckBoxes] = useState([
    {
      label: 'Boleto',
      checked: false,
      value: 'boleto',
    },
    {
      label: 'Pix',
      checked: false,
      value: 'pix',
    },
    {
      label: 'Dinheiro',
      checked: false,
      value: 'cash',
    },
    {
      label: 'Cartão de Crédito',
      checked: false,
      value: 'card',
    },
    {
      label: 'Depósito Bancário',
      checked: false,
      value: 'deposit',
    },
  ])

  const { navigate } = useNavigation<AppNavigatorRoutesProps>()

  function handleBackScreen() {
    navigate('app')
  }

  function handleGoBack() {
    navigate('app', { screen: 'myAds' })
  }

  function handleCheckboxChange(checkboxLabel: string) {
    const updatedCheckBoxes = checkBoxes.map((checkbox) => {
      if (checkbox.label === checkboxLabel) {
        return {
          ...checkbox,
          checked: !checkbox.checked,
        }
      }

      return checkbox
    })

    setCheckBoxes(updatedCheckBoxes)
  }

  /* Selecionar as imagens do produto */
  async function handleSelectProductImages() {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
      })

      if (result.canceled) {
        return
      }

      if (result.assets[0].uri) {
        const fileExtension = result.assets[0].uri.split('.').pop()

        const timestamp = new Date().getTime()

        const photoFile = {
          name: `${timestamp}.${fileExtension}`.toLowerCase(),
          uri: result.assets[0].uri,
          type: `${result.assets[0].type}/${fileExtension}`,
        }
        setProductImages((image) => [...image, photoFile])
      }
    } catch (error) {
      Toast.show({
        text1: 'Seleção de fotos do produto',
        text2: 'Não foi possível selecionar a foto do produto.',
        type: 'error',
        position: 'top',
      })
    }
  }

  /* Excluir uma imagem */
  function handleDeleteProductImage(image: ProductImagesProps) {
    const updatedProductImages = productImages.filter(
      (productImage) => productImage.name !== image.name,
    )

    setProductImages(updatedProductImages)
  }

  /* Enviar os dados para a proxima rota */
  function handlePreviewAd(data: FormDataCreateAdProps) {
    if (productImages.length === 0) {
      return Toast.show({
        text1: 'Imagens do produto',
        text2: 'Selecione pelo menos 1 imagem para seu produto!',
        type: 'info',
        position: 'top',
      })
    }

    const paymentMethods = getPaymentMethod(checkBoxes)
    if (paymentMethods.length === 0) {
      return Toast.show({
        text1: 'Meios de pagamento',
        text2: 'Selecione pelo menos um meio de pagamento!',
        type: 'info',
        position: 'top',
      })
    }

    const adPreview = {
      name: data.title,
      description: data.description,
      price: data.price,
      images: productImages,
      is_new: options === 'new',
      accept_trade: isTrade,
      payment_methods: paymentMethods,
    }

    console.log(adPreview)
    navigate('adPreview', adPreview)
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingTop: top + 20, paddingBottom: bottom }}
      className="flex-1 bg-gray-200"
    >
      <Header title="Criar anúncio" back={handleBackScreen} />
      <View className="my-6 flex-1 px-6">
        <View>
          <Text className="font-title text-base leading-[130%] text-gray-600">
            Imagens
          </Text>
          <Text className="font-body text-sm leading-[130%] text-gray-500">
            Escolha até 3 imagens para mostrar o quando o seu produto é
            incrível!
          </Text>
        </View>

        <View className="mt-4 flex-row space-x-2">
          {productImages.map((image) => (
            <View key={image.name}>
              <Image
                className="h-[100px] w-[100px] rounded-md bg-cover"
                source={{ uri: image.uri }}
                alt=""
              />

              <TouchableOpacity
                className="absolute right-1 top-1 h-4 w-4"
                activeOpacity={0.6}
                onPress={() => handleDeleteProductImage(image)}
              >
                <XCircle size={16} weight="fill" color="#eb1010" />
              </TouchableOpacity>
            </View>
          ))}

          {productImages.length < 3 && (
            <TouchableOpacity
              className="h-[100px] w-[100px] items-center justify-center rounded-md bg-gray-300"
              activeOpacity={0.6}
              onPress={handleSelectProductImages}
            >
              <Plus size={24} color="#9F9BA1" />
            </TouchableOpacity>
          )}
        </View>

        <View className="mt-8">
          <Text className="font-title text-base leading-[130%] text-gray-600">
            Sobre o produto
          </Text>

          <Controller
            control={control}
            name="title"
            render={({ field: { onChange, value } }) => (
              <Input
                className={`mt-4 ${
                  errors.title?.message
                    ? 'border border-red-400 focus:border-red-400'
                    : ''
                }`}
                placeholder="Título do anúncio"
                value={value}
                onChangeText={onChange}
                errorMessage={errors.title?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="description"
            render={({ field: { value, onChange } }) => (
              <Input
                placeholder="Descrição do produto"
                multiline={true}
                className={`mt-4 h-40 ${
                  errors.description?.message
                    ? 'border border-red-400 focus:border-red-400'
                    : ''
                }`}
                textAlignVertical="top"
                value={value}
                onChangeText={onChange}
                errorMessage={errors.description?.message}
              />
            )}
          />
        </View>

        <View className="mt-8">
          {/* Radio buttons */}
          <View className="mb-4 flex-row space-x-6">
            <View className="flex-row items-center space-x-2">
              <RadioButton
                value={options}
                label="new"
                onPress={() => setOptions('new')}
              />
              <Text className="font-body text-base leading-[130%] text-gray-600">
                Produto novo
              </Text>
            </View>

            <View className="flex-row items-center space-x-2">
              <RadioButton
                value={options}
                label="used"
                onPress={() => setOptions('used')}
              />
              <Text className="font-body text-base leading-[130%] text-gray-600">
                Produto usado
              </Text>
            </View>
          </View>

          <Text className="font-title text-base leading-[130%] text-gray-600">
            Venda
          </Text>

          <Controller
            control={control}
            name="price"
            render={({ field: { value, onChange } }) => (
              <ValueInput
                value={value}
                onChangeText={onChange}
                errorMessage={errors.price?.message}
              />
            )}
          />

          <View className="mt-4 items-start">
            <Text className="font-title text-base leading-[130%] text-gray-600">
              Aceita troca?
            </Text>

            <Switch
              style={{
                transform: [{ scaleX: 1.4 }, { scaleY: 1.2 }],
              }}
              value={isTrade}
              onValueChange={setIsTrade}
              trackColor={{ false: colors.gray[300], true: colors.blue[400] }}
              thumbColor={colors.gray[100]}
            />
          </View>

          <View className="mt-4">
            <Text className="font-title text-base leading-[130%] text-gray-600">
              Meios de pagamento aceitos
            </Text>

            {/* Grupo de checkbox */}

            <View className="mt-3 space-y-3">
              {checkBoxes.map((checkbox) => (
                <View
                  className="flex-row items-center space-x-3"
                  key={checkbox.label}
                >
                  <Checkbox
                    style={{
                      borderColor: colors.gray[400],
                    }}
                    value={checkbox.checked}
                    onValueChange={() => handleCheckboxChange(checkbox.label)}
                    color={checkbox.checked ? '#4630eb' : undefined}
                  />

                  <Text>{checkbox.label}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </View>

      {/* Footer */}
      <View className="flex-row items-center space-x-3 bg-gray-100 px-6 pb-7 pt-5">
        <Button
          className="flex-1"
          title="Cancelar"
          variant="light"
          onPress={handleGoBack}
        />
        <Button
          className="flex-1"
          title="Avançar"
          variant="dark"
          onPress={handleSubmit(handlePreviewAd)}
        />
      </View>
    </ScrollView>
  )
}
