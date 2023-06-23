import { useFocusEffect, useNavigation } from '@react-navigation/native'
import Checkbox from 'expo-checkbox'
import { useCallback, useState } from 'react'
import {
  FlatList,
  Modal,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useAuth } from '../hooks/useAuth'
import { api } from '../services/api'

import { X } from 'phosphor-react-native'
import { AdvertCard } from '../components/AdvertCard'
import { Button } from '../components/Button'
import { EmptyList } from '../components/EmptyList'
import { HomeHeader } from '../components/HomeHeader'
import { MyAdvertsCard } from '../components/MyAdvertsCard'
import { SearchInput } from '../components/SearchInput'
import { Tag } from '../components/Tag'

import { AppNavigatorRoutesProps } from '../routes/app.routes'

import { ProductDTO } from '../dtos/ProductDTO'
import { theme } from '../theme'
import { AppError } from '../utils/error/AppError'
import { CheckBoxes } from '../utils/paymentMethods/checkboxes'
import { getPaymentMethod } from '../utils/paymentMethods/getPaymentMethod'

import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import { Loading } from '../components/Loading'
import { SearchData, searchAdsSchema } from '../utils/schema/SearchAds'

type FilterProps = {
  is_new: boolean
  accept_trade: boolean
  payment_methods: string[]
}

export function Home() {
  const { colors } = theme
  const { bottom, top } = useSafeAreaInsets()
  const { navigate } = useNavigation<AppNavigatorRoutesProps>()
  const { user } = useAuth()

  const [numberOfMyAds, setNumberOfMyAds] = useState<number>(0)
  const [items, setItems] = useState<ProductDTO[]>([])
  const [modalIsVisible, setModalIsVisible] = useState(false)
  const [condition, setCondition] = useState<'new' | 'used'>(undefined)
  const [acceptTrade, setAcceptTrade] = useState<boolean>(undefined)
  const [checkBoxes, setCheckBoxes] = useState(CheckBoxes)
  const [isLoading, setIsLoading] = useState(true)

  const { control, handleSubmit } = useForm<SearchData>({
    resolver: zodResolver(searchAdsSchema),
  })

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

  function handleRemoveCondition() {
    setCondition(undefined)
  }

  /** Rotas de navegações */
  function handleCreateAd() {
    navigate('createAd')
  }

  function handleAdDetails(id: string) {
    navigate('adDetails', {
      id,
    })
  }

  function handleMyAds() {
    navigate('app', { screen: 'myAds' })
  }

  function handleResetFilters() {
    setCondition(undefined)
    setAcceptTrade(undefined)
    setCheckBoxes(CheckBoxes)
  }

  // Buscar anúncios com filtro
  async function handleApplyFilters({ search }: SearchData) {
    const paymentMethods = getPaymentMethod(checkBoxes)
    const filter: FilterProps = {
      is_new: condition === undefined ? undefined : condition === 'new',
      accept_trade: acceptTrade === undefined ? undefined : acceptTrade,
      payment_methods: paymentMethods.length === 0 ? undefined : paymentMethods,
    }

    try {
      setModalIsVisible(false)
      setIsLoading(true)
      if (!search || search.trim() === '') {
        search = undefined
      }

      const response = await api.get('/products', {
        params: {
          ...filter,
          query: search,
        },
      })

      const data: ProductDTO[] = response.data
      setItems(data)
    } catch (error) {
      const isAppError = error instanceof AppError

      const title = isAppError
        ? error.message
        : 'Não foi possível encontrar nenhum anúncio disponível. Serviço indisponível no momento.'
      Toast.show({
        text1: 'Anúncios',
        text2: title,
        type: 'error',
        position: 'top',
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Buscar anúncios na api assim que o componente é montado
  async function fetchAdsData() {
    try {
      setIsLoading(true)
      const { data } = await api.get<ProductDTO[]>('/users/products')
      const myActiveAds = data.filter((ad) => ad.is_active === true)
      setNumberOfMyAds(myActiveAds.length)

      const response = await api.get('/products')
      const products: ProductDTO[] = response.data
      setItems(products)
    } catch (error) {
      const isAppError = error instanceof AppError

      const title = isAppError
        ? error.message
        : 'Não foi possível encontrar nenhum anúncio disponível. Serviço indisponível no momento.'
      Toast.show({
        text1: 'Anúncios',
        text2: title,
        type: 'error',
        position: 'top',
      })
    } finally {
      setIsLoading(false)
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchAdsData()
    }, []),
  )

  return (
    <>
      <View
        style={{ paddingTop: top + 20, paddingBottom: bottom }}
        className="flex-1 bg-gray-200 px-6"
      >
        <HomeHeader
          avatar={user.avatar}
          name={user.name}
          handleCreateAd={handleCreateAd}
        />
        <MyAdvertsCard numberOfAds={numberOfMyAds} goMyAds={handleMyAds} />

        <Controller
          control={control}
          name="search"
          render={({ field: { onChange, value } }) => (
            <SearchInput
              placeholder="Buscar anúncio"
              search={handleSubmit(handleApplyFilters)}
              openModal={() => setModalIsVisible(true)}
              value={value}
              onChangeText={onChange}
            />
          )}
        />

        <View className="mt-6 flex-1">
          {/* List */}

          {isLoading ? (
            <View className="flex-1 items-center justify-center">
              <Loading />
            </View>
          ) : (
            <FlatList
              contentContainerStyle={{ flexGrow: 1 }}
              data={items}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <AdvertCard
                  product={{ ...item, is_active: true }}
                  onPress={() => handleAdDetails(item.id)}
                />
              )}
              numColumns={2}
              columnWrapperStyle={{ justifyContent: 'space-between' }}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={<EmptyList />}
            />
          )}
        </View>
      </View>

      <Modal
        visible={modalIsVisible}
        animationType="fade"
        statusBarTranslucent
        transparent
      >
        <View
          style={{ paddingBottom: bottom }}
          className="flex-1 justify-end bg-black/50"
        >
          <TouchableOpacity
            className="flex-1"
            onPress={() => setModalIsVisible(false)}
          />

          <View className="rounded-t-3xl bg-gray-200 px-6 pb-8 pt-12">
            <View className="flex-row items-center justify-between">
              <Text className="font-title text-xl leading-[130%] text-gray-700">
                Filtrar anúncios
              </Text>

              <TouchableOpacity onPress={() => setModalIsVisible(false)}>
                <X size={24} color={colors.gray[400]} />
              </TouchableOpacity>
            </View>

            <View className="mt-6">
              <Text className="font-title text-sm text-gray-600">Condição</Text>
              <View className="mt-3 flex-row space-x-2">
                {/* useState para gerenciar qual dos 2 está selecionado */}
                <Tag
                  className={`items-center py-1.5 ${
                    condition === 'new' ? 'pl-4 pr-1.5' : 'px-4'
                  }`}
                  isNew={true}
                  onPress={() => setCondition('new')}
                  isActive={condition === 'new'}
                  removeCondition={handleRemoveCondition}
                />
                <Tag
                  className={`items-center py-1.5 ${
                    condition === 'used' ? 'pl-4 pr-1.5' : 'px-4'
                  }`}
                  isNew={false}
                  onPress={() => setCondition('used')}
                  isActive={condition === 'used'}
                  removeCondition={handleRemoveCondition}
                />
              </View>
            </View>

            <View className="mt-6 items-start">
              <Text className="font-title text-base leading-[130%] text-gray-600">
                Aceita troca?
              </Text>

              <Switch
                style={{
                  transform: [{ scaleX: 1.4 }, { scaleY: 1.2 }],
                }}
                value={acceptTrade}
                onValueChange={setAcceptTrade}
                trackColor={{ false: colors.gray[300], true: colors.blue[400] }}
                thumbColor={colors.gray[100]}
              />
            </View>

            <View className="mt-6 space-y-3">
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
                    color={checkbox.checked ? '#647AC7' : undefined}
                  />

                  <Text>{checkbox.label}</Text>
                </View>
              ))}
            </View>

            <View className="mt-16 flex-row space-x-3">
              <Button
                className="flex-1"
                title="Resetar filtros"
                variant="light"
                onPress={handleResetFilters}
              />
              <Button
                className="flex-1"
                title="Aplicar filtros"
                variant="dark"
                onPress={handleSubmit(handleApplyFilters)}
              />
            </View>
          </View>
        </View>
      </Modal>
    </>
  )
}
