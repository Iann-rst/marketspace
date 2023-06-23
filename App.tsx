import {
  Karla_400Regular,
  Karla_700Bold,
  useFonts,
} from '@expo-google-fonts/karla'
import { StatusBar, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import { Loading } from './src/components/Loading'
import { AuthContextProvider } from './src/context/auth'
import { Routes } from './src/routes'
import { toastConfig } from './src/theme/toast-config'

export default function App() {
  const [fontsLoaded] = useFonts({
    Karla_400Regular,
    Karla_700Bold,
  })

  if (!fontsLoaded) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-200">
        <Loading />
      </View>
    )
  }

  return (
    <GestureHandlerRootView className="flex-1">
      <AuthContextProvider>
        <Routes />
        <StatusBar
          backgroundColor="transparent"
          barStyle="dark-content"
          translucent
        />

        <Toast config={toastConfig} topOffset={60} />
      </AuthContextProvider>
    </GestureHandlerRootView>
  )
}
