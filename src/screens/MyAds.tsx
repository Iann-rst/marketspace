import { Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { AdvertCard } from '../components/AdvertCard'
import { Header } from '../components/Header'

export function MyAds() {
  const { bottom, top } = useSafeAreaInsets()

  return (
    <View style={{ paddingTop: top + 20 }} className="flex-1 bg-gray-200">
      <Header iconLeft={false} title="Meus anúncios" iconRight="plus" />
      <View className="mt-8 px-6">
        <View className="mb-5 flex-row items-center justify-between">
          <Text className="font-body text-sm leading-[130%] text-gray-600">
            9 anúncios
          </Text>
        </View>

        <AdvertCard showUser={false} />
      </View>
    </View>
  )
}
