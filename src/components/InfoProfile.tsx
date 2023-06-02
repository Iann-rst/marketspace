import { Text, View } from 'react-native'
import { Avatar } from './Avatar'

interface InfoProfileProps {
  userImage: string
  name: string
}

export function InfoProfile() {
  return (
    <View className="w-full flex-row items-center space-x-2">
      <Avatar
        borderIsBlue
        borderWidth={2}
        size={30}
        source={{ uri: 'https://github.com/Iann-rst.png' }}
      />

      <Text className="font-body text-sm leading-[130%] text-gray-700">
        Iann Rodrigues
      </Text>
    </View>
  )
}
