import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { FlatList, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { AdvertCard } from '../components/AdvertCard'
import { HomeHeader } from '../components/HomeHeader'
import { MyAdvertsCard } from '../components/MyAdvertsCard'
import { SearchInput } from '../components/SearchInput'
import { AppNavigatorRoutesProps } from '../routes/app.routes'

export function Home() {
  const { bottom, top } = useSafeAreaInsets()
  const { navigate } = useNavigation<AppNavigatorRoutesProps>()

  const [items, setItems] = useState([
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
  ])

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

  return (
    <View
      style={{ paddingTop: top + 20, paddingBottom: bottom }}
      className="flex-1 bg-gray-200 px-6"
    >
      <HomeHeader handleCreateAd={handleCreateAd} />
      <MyAdvertsCard goMyAds={handleMyAds} />
      <SearchInput />

      <View className="mt-6 flex-1">
        {/* List */}
        <FlatList
          data={items}
          keyExtractor={(item) => item}
          renderItem={(item) => (
            <AdvertCard onPress={() => handleAdDetails(item.item)} />
          )}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  )
}
