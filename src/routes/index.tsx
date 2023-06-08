import { DefaultTheme, NavigationContainer } from '@react-navigation/native'

import { useAuth } from '../hooks/useAuth'
import { theme } from '../theme'
import { AppRoutes } from './app.routes'
import { AuthRoutes } from './auth.routes'

export function Routes() {
  const { user } = useAuth()

  const themeNavigation = DefaultTheme
  themeNavigation.colors.background = theme.colors.gray[200]

  return (
    <NavigationContainer theme={themeNavigation}>
      {user?.id ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  )
}
