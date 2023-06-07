import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack'
import { AdDetails } from '../screens/AdDetails'
import { AdPreview } from '../screens/AdPreview'
import { CreateAd } from '../screens/CreateAd'
import { EditAd } from '../screens/EditAd'
import { MyAdDetails } from '../screens/MyAdDetails'
import { AppTabRoutes } from './app.tab.routes'

type AppRoutesTypes = {
  app: {
    screen: 'home' | 'myAds' | 'signOut'
  }
  adDetails: {
    id: string
  }
  createAd: undefined
  adPreview: undefined
  myAdDetails: {
    id: string
  }
  editAd: undefined
}

export type AppNavigatorRoutesProps = NativeStackNavigationProp<AppRoutesTypes>

const { Navigator, Screen } = createNativeStackNavigator<AppRoutesTypes>()

export function AppRoutes() {
  return (
    <Navigator>
      <Screen name="app" component={AppTabRoutes} />
      <Screen name="adDetails" component={AdDetails} />
      <Screen name="createAd" component={CreateAd} />
      <Screen name="myAdDetails" component={MyAdDetails} />
      <Screen name="adPreview" component={AdPreview} />
      <Screen name="editAd" component={EditAd} />
    </Navigator>
  )
}
