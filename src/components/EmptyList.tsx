import { Text, View } from 'react-native'

export function EmptyList() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-center font-title text-gray-700">
        No momento não há nenhum anúncio disponível
      </Text>
    </View>
  )
}
