import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs'
import { House, SignOut, Tag } from 'phosphor-react-native'
import { theme } from '../../tailwind.config'
import { Home } from '../screens/Home'
import { MyAds } from '../screens/MyAds'

type AppTabRoutesTypes = {
  home: undefined
  myAds: undefined
  signOut: undefined
}

export type AppTabRoutesProps = BottomTabNavigationProp<AppTabRoutesTypes>

const { Navigator, Screen } = createBottomTabNavigator<AppTabRoutesTypes>()

export function AppTabRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: theme.extend.colors.gray[600],
        tabBarInactiveTintColor: theme.extend.colors.gray[400],
        tabBarStyle: {
          height: 72,
          backgroundColor: theme.extend.colors.gray[100],
          paddingBottom: 28,
          paddingTop: 20,
          paddingHorizontal: 28,
        },
      }}
    >
      <Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <House size={24} color={color} weight="bold" />
          ),
        }}
      />
      <Screen
        name="myAds"
        component={MyAds}
        options={{
          tabBarIcon: ({ color }) => (
            <Tag size={24} color={color} weight="bold" />
          ),
        }}
      />

      {/** FIXME: Corrigir a rota de logout */}
      <Screen
        name="signOut"
        component={MyAds}
        options={{
          tabBarIcon: () => (
            <SignOut
              size={24}
              color={theme.extend.colors.red[400]}
              weight="regular"
            />
          ),
        }}
      />
    </Navigator>
  )
}
