import {
  Karla_400Regular,
  Karla_700Bold,
  useFonts,
} from '@expo-google-fonts/karla'
import { StatusBar } from 'expo-status-bar'
import { SignUp } from './src/screens/SignUp'

export default function App() {
  const [fontsLoaded] = useFonts({
    Karla_400Regular,
    Karla_700Bold,
  })

  if (!fontsLoaded) {
    return null
  }
  return (
    <>
      <SignUp />
      <StatusBar style="auto" />
    </>
  )
}
