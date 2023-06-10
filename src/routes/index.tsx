import { DefaultTheme, NavigationContainer } from '@react-navigation/native'

import { View } from 'react-native'
import { Loading } from '../components/Loading'
import { useAuth } from '../hooks/useAuth'
import { theme } from '../theme'
import { AppRoutes } from './app.routes'
import { AuthRoutes } from './auth.routes'

export function Routes() {
  const { user, isLoadingUser } = useAuth()

  const themeNavigation = DefaultTheme
  themeNavigation.colors.background = theme.colors.gray[200]

  if (isLoadingUser) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-200">
        <Loading />
      </View>
    )
  }
  return (
    <NavigationContainer theme={themeNavigation}>
      {user.id ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  )
}
