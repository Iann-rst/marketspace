import { Text, View } from 'react-native'

export function Overlay() {
  return (
    <View className="absolute h-full w-full justify-end rounded-lg bg-gray-700/60 p-2">
      <Text className="font-title text-xs uppercase text-gray-100">
        anúncio desativado
      </Text>
    </View>
  )
}
