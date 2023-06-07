import {
  Karla_400Regular,
  Karla_700Bold,
  useFonts,
} from '@expo-google-fonts/karla'
import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { AppTabRoutes } from './src/routes/app.tab.routes'
import { theme } from './src/theme'

export default function App() {
  const [fontsLoaded] = useFonts({
    Karla_400Regular,
    Karla_700Bold,
  })

  if (!fontsLoaded) {
    return null
  }

  const themeNavigation = DefaultTheme
  themeNavigation.colors.background = theme.colors.gray[200]

  return (
    <NavigationContainer theme={themeNavigation}>
      <GestureHandlerRootView className="flex-1">
        <AppTabRoutes />
        <StatusBar
          backgroundColor="transparent"
          barStyle="dark-content"
          translucent
        />
      </GestureHandlerRootView>
    </NavigationContainer>
  )
}
