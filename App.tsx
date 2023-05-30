import { StatusBar } from 'expo-status-bar'
import { Text, View } from 'react-native'

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-gray-900">
      <Text className="text-gray-200">NativeWind CSS</Text>

      <StatusBar style="auto" />
    </View>
  )
}
