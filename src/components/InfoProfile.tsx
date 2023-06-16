import { Text, View } from 'react-native'
import { api } from '../services/api'
import { Avatar } from './Avatar'

interface InfoProfileProps {
  userImage: string
  name: string
}

export function InfoProfile({ name, userImage }: InfoProfileProps) {
  return (
    <View className="w-full flex-row items-center space-x-2">
      <Avatar
        borderIsBlue
        borderWidth={2}
        size={30}
        source={{ uri: `${api.defaults.baseURL}/images/${userImage}` }}
      />

      <Text className="font-body text-sm leading-[130%] text-gray-700">
        {name}
      </Text>
    </View>
  )
}
