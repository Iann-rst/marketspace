import {
  Karla_400Regular,
  Karla_700Bold,
  useFonts,
} from '@expo-google-fonts/karla'
import { StatusBar } from 'expo-status-bar'
import { Text, View } from 'react-native'

export default function App() {
  const [fontsLoaded] = useFonts({
    Karla_400Regular,
    Karla_700Bold,
  })

  if (!fontsLoaded) {
    return null
  }
  return (
    <View className="flex-1 items-center justify-center bg-gray-900">
      <Text className="text-gray-200">NativeWind CSS</Text>

      <StatusBar style="auto" />
    </View>
  )
}
