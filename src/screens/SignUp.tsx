import { ScrollView, Text, TouchableOpacity, View } from 'react-native'

import { useState } from 'react'
import { Avatar } from '../components/Avatar'

import { Eye, EyeClosed, PencilSimpleLine } from 'phosphor-react-native'
import UserAvatar from '../assets/avatar.png'
import Logo from '../assets/logo.svg'
import { Button } from '../components/Button'
import { Input } from '../components/Input'

export function SignUp() {
  const [userAvatar, setUserAvatar] = useState<string | null>(null)
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false)

  /* Selecionar imagem do usuário com Expo Picker */
  async function handlePhotoUserSelected() {
    setUserAvatar(null)
  }

  // TODO - className="flex-grow bg-white"
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View className="flex-1 bg-gray-200 px-12 py-14">
        <View className="items-center justify-center">
          <Logo width={60} height={40} />
          <Text className="mt-4 font-title text-xl text-gray-700">
            Boas vindas!
          </Text>
          <Text className="mt-2 text-center font-body text-sm leading-[18.2px] text-gray-600">
            Crie sua conta e use o espaço para comprar itens variados e vender
            seus produtos.
          </Text>
        </View>

        {/* Formulário */}
        <View className="mt-8 items-center justify-center space-y-4">
          <View className="justify-end">
            <Avatar
              alt=""
              source={
                userAvatar
                  ? { uri: 'https://github.com/Iann-rst.png' }
                  : UserAvatar
              }
            />

            <TouchableOpacity
              onPress={handlePhotoUserSelected}
              activeOpacity={0.8}
              className="absolute -right-2 h-10 w-10 items-center justify-center rounded-full bg-blue-400"
            >
              <PencilSimpleLine size={16} color="rgb(237, 236, 238)" />
            </TouchableOpacity>
          </View>

          <View className="w-full items-center space-y-4">
            <Input placeholder="Nome" keyboardType="default" />
            <Input placeholder="E-mail" keyboardType="email-address" />
            <Input placeholder="Telefone" keyboardType="phone-pad" />

            {/* Input de senha */}
            <View className="flex-row items-center rounded-md bg-gray-100 px-3 py-4 focus:border focus:border-gray-500">
              <Input
                placeholder="Senha"
                className="flex-1 px-0 py-0 focus:border-0"
                secureTextEntry={passwordVisible}
              />

              <TouchableOpacity
                onPress={() => setPasswordVisible((prevState) => !prevState)}
              >
                {passwordVisible ? <EyeClosed size={20} /> : <Eye size={20} />}
              </TouchableOpacity>
            </View>

            {/* Input de confirmar senha */}
            <View className="flex-row items-center rounded-md bg-gray-100 px-3 py-4 focus:border focus:border-gray-500">
              <Input
                placeholder="Confirmar senha"
                className="flex-1 px-0 py-0 focus:border-0"
                secureTextEntry={passwordVisible}
              />

              <TouchableOpacity
                onPress={() =>
                  setConfirmPasswordVisible((prevState) => !prevState)
                }
              >
                {confirmPasswordVisible ? (
                  <EyeClosed size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <Button title="Criar" variant="dark" />

        <View className="mt-12 items-center justify-center space-y-4">
          <Text className="font-body text-sm text-gray-600">
            Já tem uma conta?
          </Text>
          <Button title="Ir para o login" variant="light" className="w-full" />
        </View>
      </View>
    </ScrollView>
  )
}
