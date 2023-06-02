import {
  Karla_400Regular,
  Karla_700Bold,
  useFonts,
} from '@expo-google-fonts/karla'
import { StatusBar } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { AdDetails } from './src/screens/AdDetails'

export default function App() {
  const [fontsLoaded] = useFonts({
    Karla_400Regular,
    Karla_700Bold,
  })

  if (!fontsLoaded) {
    return null
  }
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView className="flex-1">
        <AdDetails />
        <StatusBar
          backgroundColor="transparent"
          barStyle="default"
          translucent
        />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  )
}
