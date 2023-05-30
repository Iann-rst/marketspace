import { Text, TextInput, TouchableOpacity, View } from 'react-native'

import { Eye, EyeClosed } from 'phosphor-react-native'
import { useState } from 'react'
import Logo from './../assets/logo.svg'

export function SignIn() {
  const [passwordVisible, setPasswordVisible] = useState(false)

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

          <TextInput
            placeholder="E-mail"
            placeholderTextColor="#9F9BA1"
            className="w-full rounded-md bg-gray-100 px-3 py-4 text-gray-600 focus:border focus:border-gray-500"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <View className="w-full flex-row items-center rounded-md bg-gray-100 px-3 py-4 focus:border focus:border-gray-500">
            <TextInput
              placeholder="Senha"
              placeholderTextColor="#9F9BA1"
              className="flex-1 text-gray-600"
              autoCorrect={false}
              secureTextEntry={passwordVisible}
              autoCapitalize="none"
            />

            <TouchableOpacity
              onPress={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? <EyeClosed size={20} /> : <Eye size={20} />}
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.6}
          className="mt-8 w-full flex-row items-center justify-center space-x-2 rounded-md bg-blue-400 px-3 py-3"
        >
          <Text className="font-title text-sm text-gray-100">Entrar</Text>
        </TouchableOpacity>
      </View>

      <View className="items-center gap-4 px-12 py-14">
        <Text>Ainda não tem acesso?</Text>
        <TouchableOpacity
          activeOpacity={0.6}
          className="mt-8 w-full flex-row items-center justify-center space-x-2 rounded-md bg-gray-300 px-3 py-3"
        >
          <Text className="font-title text-sm text-gray-700">
            Criar uma conta
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
