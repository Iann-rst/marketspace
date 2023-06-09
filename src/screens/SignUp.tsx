/* eslint-disable no-useless-return */
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigation } from '@react-navigation/native'
import * as ImagePicker from 'expo-image-picker'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { AuthNavigatorRoutesProps } from '../routes/auth.routes'

import { Avatar } from '../components/Avatar'
import { Button } from '../components/Button'
import { Input } from '../components/Input'

import { Eye, EyeClosed, PencilSimpleLine } from 'phosphor-react-native'

import UserAvatar from '../assets/avatar.png'
import Logo from '../assets/logo.svg'
import {
  FormDataSignUpProps,
  signUpSchemaValidation,
} from '../utils/schema/SignUp'

type UserImageSelectedProps = {
  name: string
  uri: string
  type: string
}

export function SignUp() {
  const [userAvatar, setUserAvatar] = useState<UserImageSelectedProps | null>(
    null,
  )
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { navigate } = useNavigation<AuthNavigatorRoutesProps>()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataSignUpProps>({
    resolver: zodResolver(signUpSchemaValidation),
    defaultValues: {
      email: '',
      name: '',
      password: '',
      password_confirm: '',
      tel: '',
    },
  })

  /* Selecionar imagem do usuário com Expo Picker */
  async function handlePhotoUserSelected() {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
      })

      if (result.canceled) {
        return
      }

      if (result.assets[0].uri) {
        const fileExtension = result.assets[0].uri.split('.').pop()

        const timestamp = new Date().getTime()

        const photoFile = {
          name: `${timestamp}.${fileExtension}`.toLowerCase(),
          uri: result.assets[0].uri,
          type: `${result.assets[0].type}/${fileExtension}`,
        }

        setUserAvatar(photoFile)
      }
    } catch (error) {
      console.log(error)
    }
  }

  /* enviar os dados do formulário para a api */
  async function handleSignUp({
    email,
    name,
    password,
    tel,
  }: FormDataSignUpProps) {
    try {
      setIsLoading(true)

      if (!userAvatar) {
        return alert('Selecione uma imagem de perfil.')
      }

      const userImage = {
        ...userAvatar,
        name: `${name}.${userAvatar.name}`.toLowerCase().replace(' ', '-'),
      } as any

      const userSignUpForm = new FormData()
      userSignUpForm.append('avatar', userImage)
      userSignUpForm.append('name', name)
      userSignUpForm.append('email', email)
      userSignUpForm.append('password', password)
      userSignUpForm.append('tel', tel)

      console.log(userSignUpForm)

      /** TODO: Conectar na api, fazer o cadastro e depois enviar email e senha para a função de signIn */
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  function goSignInScreen() {
    navigate('signIn')
  }

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
              size={88}
              borderIsBlue
              borderWidth={3}
              alt=""
              source={userAvatar ? { uri: userAvatar.uri } : UserAvatar}
            />

            <TouchableOpacity
              onPress={handlePhotoUserSelected}
              activeOpacity={0.8}
              className="absolute -right-2 h-10 w-10 items-center justify-center rounded-full bg-blue-400"
            >
              <PencilSimpleLine size={16} color="rgb(237, 236, 238)" />
            </TouchableOpacity>
          </View>

          <View className="w-full items-center">
            {/* Input nome */}
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, value } }) => (
                <Input
                  className={`${
                    errors.name?.message
                      ? 'border border-red-400 focus:border-red-400'
                      : ''
                  }`}
                  placeholder="Nome"
                  keyboardType="default"
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.name?.message}
                />
              )}
            />
            {/* Input e-mail */}
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <Input
                  className={`mt-4 ${
                    errors.email?.message
                      ? 'border border-red-400 focus:border-red-400'
                      : ''
                  }`}
                  placeholder="E-mail"
                  keyboardType="email-address"
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.email?.message}
                />
              )}
            />

            {/* Input phone */}
            <Controller
              control={control}
              name="tel"
              render={({ field: { onChange, value } }) => (
                <Input
                  className={`mt-4 ${
                    errors.tel?.message
                      ? 'border border-red-400 focus:border-red-400'
                      : ''
                  }`}
                  placeholder="Telefone"
                  keyboardType="phone-pad"
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.tel?.message}
                />
              )}
            />

            {/* Input de senha */}
            <>
              <View
                className={`mt-4 flex-row items-center rounded-md bg-gray-100 px-3 py-4 focus:border focus:border-gray-500 ${
                  errors.password?.message
                    ? 'border border-red-400 focus:border focus:border-red-400 '
                    : ''
                }`}
              >
                <Controller
                  control={control}
                  name="password"
                  render={({ field: { onChange, value } }) => (
                    <Input
                      placeholder="Senha"
                      className="flex-1 px-0 py-0 focus:border-0"
                      secureTextEntry={passwordVisible}
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                />

                <TouchableOpacity
                  onPress={() => setPasswordVisible((prevState) => !prevState)}
                >
                  {passwordVisible ? (
                    <EyeClosed size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </TouchableOpacity>
              </View>
              {/* mensagem de error */}
              {errors.password?.message && (
                <Text className="self-start font-title text-xs text-red-400">
                  {errors.password?.message}
                </Text>
              )}
            </>

            {/* Input de confirmar senha */}
            <>
              <View
                className={`mt-4 flex-row items-center rounded-md bg-gray-100 px-3 py-4 focus:border focus:border-gray-500 ${
                  errors.password_confirm?.message
                    ? 'border border-red-400 focus:border focus:border-red-400 '
                    : ''
                }`}
              >
                <Controller
                  control={control}
                  name="password_confirm"
                  render={({ field: { onChange, value } }) => (
                    <Input
                      placeholder="Confirmar senha"
                      className="flex-1 px-0 py-0 focus:border-0"
                      secureTextEntry={passwordVisible}
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
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
              {errors.password_confirm?.message && (
                <Text className="self-start font-title text-xs text-red-400">
                  {errors.password_confirm?.message}
                </Text>
              )}
            </>
          </View>
        </View>

        <Button
          title="Criar"
          variant="dark"
          className="mt-8"
          onPress={handleSubmit(handleSignUp)}
          isLoading={isLoading}
          disabled={isLoading}
        />

        <View className="mt-12 items-center justify-center space-y-4">
          <Text className="font-body text-sm text-gray-600">
            Já tem uma conta?
          </Text>
          <Button
            title="Ir para o login"
            variant="light"
            className="w-full"
            onPress={goSignInScreen}
          />
        </View>
      </View>
    </ScrollView>
  )
}
