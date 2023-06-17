import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { useCallback, useState } from 'react'
import { FlatList, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { AdvertCard } from '../components/AdvertCard'
import { EmptyList } from '../components/EmptyList'
import { HomeHeader } from '../components/HomeHeader'
import { MyAdvertsCard } from '../components/MyAdvertsCard'
import { SearchInput } from '../components/SearchInput'
import { ProductDTO } from '../dtos/ProductDTO'
import { useAuth } from '../hooks/useAuth'
import { AppNavigatorRoutesProps } from '../routes/app.routes'
import { api } from '../services/api'

export function Home() {
  const { bottom, top } = useSafeAreaInsets()
  const { navigate } = useNavigation<AppNavigatorRoutesProps>()
  const { user } = useAuth()

  const [numberOfMyAds, setNumberOfMyAds] = useState<number>(0)

  const [items, setItems] = useState<ProductDTO[]>([])

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

  async function fetchAdsData() {
    try {
      const { data } = await api.get<ProductDTO[]>('/users/products')
      const myActiveAds = data.filter((ad) => ad.is_active === true)
      setNumberOfMyAds(myActiveAds.length)

      const response = await api.get('/products')
      const products: ProductDTO[] = response.data
      setItems(products)
    } catch (error) {
      console.log(error)
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchAdsData()
    }, []),
  )

  return (
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
      <SearchInput />

      <View className="mt-6 flex-1">
        {/* List */}
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
      </View>
    </View>
  )
}
