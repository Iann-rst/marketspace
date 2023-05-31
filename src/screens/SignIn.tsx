import { Text, TouchableOpacity, View } from 'react-native'

import { Eye, EyeClosed } from 'phosphor-react-native'
import { useState } from 'react'
import { Button } from '../components/Button'
import { Input } from '../components/Input'
import Logo from './../assets/logo.svg'

export function SignIn() {
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleSignIn() {}

  return (
    <View className="flex-1 bg-gray-100">
      <View className="w-full items-center rounded-b-3xl bg-gray-200 px-12 py-16">
        <View className="items-center justify-center">
          <Logo />
          <Text className="mt-5 text-3xl font-bold text-gray-700">
            marketspace
          </Text>
          <Text className="font-body text-sm leading-[18.2px] text-gray-500">
            Seu espaço de compra e venda
          </Text>
        </View>

        <View className="mt-16 w-full items-center space-y-4">
          <Text className="font-body text-sm leading-[18.2px] text-gray-600">
            Acesse sua conta
          </Text>

          <Input
            placeholder="E-mail"
            keyboardType="email-address"
            onChangeText={setEmail}
            value={email}
          />

          {/* Input de senha */}
          <View className="w-full flex-row items-center rounded-md bg-gray-100 px-3 py-4 focus:border focus:border-gray-500">
            <Input
              placeholder="Senha"
              className="flex-1 px-0 py-0 focus:border-0"
              secureTextEntry={passwordVisible}
              onChangeText={setPassword}
              value={password}
            />

            <TouchableOpacity
              onPress={() => setPasswordVisible((prevState) => !prevState)}
            >
              {passwordVisible ? <EyeClosed size={20} /> : <Eye size={20} />}
            </TouchableOpacity>
          </View>
        </View>

        <Button className="mt-8 w-full" title="Entrar" onPress={handleSignIn} />
      </View>

      <View className="flex-1 items-center gap-4 px-12 py-14">
        <Text>Ainda não tem acesso?</Text>
        <Button className="w-full" title="Criar uma conta" variant="light" />
      </View>
    </View>
  )
}
