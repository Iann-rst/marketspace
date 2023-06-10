import { Text, View } from 'react-native'
import { api } from '../services/api'
import { Avatar } from './Avatar'
import { Button } from './Button'

type HomeHeaderProps = {
  avatar: string
  name: string
  handleCreateAd: () => void
}

export function HomeHeader({ avatar, name, handleCreateAd }: HomeHeaderProps) {
  return (
    <View className="flex-row items-center justify-between">
      <View className="flex-row items-center space-x-2">
        <Avatar
          size={45}
          borderIsBlue
          borderWidth={2}
          source={{ uri: `${api.defaults.baseURL}/images/${avatar}` }}
          alt=""
        />
        <View className="">
          <Text className="font-body text-base leading-[18.2px] text-gray-700">
            Boas vindas,
          </Text>
          <Text className="font-title text-base leading-[18.2px] text-gray-700">
            {name.split(' ')[0]}
          </Text>
        </View>
      </View>
      <Button
        className="w-32"
        title="Criar anúncio"
        variant="dark"
        onPress={handleCreateAd}
      />
    </View>
  )
}
