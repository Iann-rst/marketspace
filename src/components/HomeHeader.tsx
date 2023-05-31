import { Text, View } from 'react-native'
import { Avatar } from './Avatar'
import { Button } from './Button'

export function HomeHeader() {
  return (
    <View className="mt-9 flex-row items-center justify-between">
      <View className="flex-row items-center space-x-2">
        <Avatar
          size={45}
          borderIsBlue
          borderWidth={2}
          source={{ uri: 'https://github.com/Iann-rst.png' }}
          alt=""
        />
        <View className="">
          <Text className="font-body text-base leading-[18.2px] text-gray-700">
            Boas vindas,
          </Text>
          <Text className="font-title text-base leading-[18.2px] text-gray-700">
            Iann!
          </Text>
        </View>
      </View>
      <Button className="w-36" title="Criar anúncio" variant="dark" />
    </View>
  )
}
