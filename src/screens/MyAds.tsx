import { FlatList, Text, View } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { useCallback, useMemo, useState } from 'react'
import { AdvertCard } from '../components/AdvertCard'
import { EmptyList } from '../components/EmptyList'
import { Header } from '../components/Header'
import { Loading } from '../components/Loading'
import { ProductDTO } from '../dtos/ProductDTO'
import { AppNavigatorRoutesProps } from '../routes/app.routes'
import { api } from '../services/api'

interface SelectProps {
  label: string
  value: string
}

export function MyAds() {
  const { navigate } = useNavigation<AppNavigatorRoutesProps>()
  const { bottom, top } = useSafeAreaInsets()
  const [isLoading, setIsLoading] = useState(true)
  const [value, setValue] = useState<string>('all')
  const [myAds, setMyAds] = useState<ProductDTO[]>([])

  const select: SelectProps[] = useMemo(
    () => [
      { label: 'Todos', value: 'all' },
      { label: 'Ativos', value: 'active' },
      { label: 'Inativos', value: 'inactive' },
    ],
    [],
  )

  const renderItem = (item: SelectProps) => {
    return (
      <View className="rounded-md bg-gray-100 px-3 py-1.5">
        <Text
          className={`text-sm text-gray-600 ${
            item.value === value ? 'font-title' : 'font-body'
          }`}
        >
          {item.label}
        </Text>
      </View>
    )
  }

  const myAdsFiltered = myAds.filter((product) => {
    if (value === 'all') {
      return true
    }

    return value === 'active'
      ? product.is_active === true
      : product.is_active === false
  })

  function handleMyAdDetails(id: string) {
    navigate('myAdDetails', {
      id,
    })
  }

  function handleCreateAd() {
    navigate('createAd')
  }

  useFocusEffect(
    useCallback(() => {
      async function fetchMyAds() {
        try {
          setIsLoading(true)
          const response = await api.get('/users/products')

          const products: ProductDTO[] = response.data

          setMyAds(products)
        } catch (error) {
          console.log(error)
        } finally {
          setIsLoading(false)
        }
      }

      fetchMyAds()
    }, []),
  )

  return (
    <View
      style={{ paddingTop: top + 20, paddingBottom: bottom }}
      className="flex-1 bg-gray-200"
    >
      <Header
        iconLeft={false}
        title="Meus anúncios"
        iconRight="plus"
        rightFunction={handleCreateAd}
      />
      <View className="mt-8 flex-1 px-6">
        <View className="mb-5 flex-row items-center justify-between">
          <Text className="font-body text-sm leading-[130%] text-gray-600">
            {myAdsFiltered.length === 0
              ? 'Nenhum anúncio'
              : myAdsFiltered.length === 1
              ? '1 anúncio'
              : `${myAdsFiltered.length} anúncios`}
          </Text>
          <Dropdown
            style={{
              width: 110,
              height: 34,
              borderWidth: 1,
              borderColor: '#D9D8DA',
              borderRadius: 6,
              paddingVertical: 6,
              paddingHorizontal: 12,
            }}
            selectedTextStyle={{
              fontSize: 14,
              lineHeight: 18,
              color: '#3E3A40',
            }}
            containerStyle={{
              borderRadius: 6,
            }}
            data={select}
            value={value}
            placeholder="Todos"
            labelField="label"
            valueField="value"
            onChange={(item) => setValue(item.value)}
            renderItem={renderItem}
          />
        </View>

        {isLoading ? (
          <View className="flex-1 items-center justify-center">
            <Loading />
          </View>
        ) : (
          <FlatList
            contentContainerStyle={{
              paddingBottom: 40,
              flexGrow: 1,
            }}
            data={myAdsFiltered}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <AdvertCard
                product={item}
                onPress={() => handleMyAdDetails(item.id)}
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
  )
}
