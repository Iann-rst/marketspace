import { zodResolver } from '@hookform/resolvers/zod'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { useCallback, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { AuthNavigatorRoutesProps } from '../routes/auth.routes'

import { Button } from '../components/Button'
import { Input } from '../components/Input'

import { Eye, EyeClosed } from 'phosphor-react-native'
import Logo from './../assets/logo.svg'

import {
  FormDataSignInProps,
  signInSchemaValidation,
} from '../utils/schema/SignIn'

export function SignIn() {
  const [passwordVisible, setPasswordVisible] = useState(false)
  const { navigate } = useNavigation<AuthNavigatorRoutesProps>()

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormDataSignInProps>({
    mode: 'onSubmit',
    resolver: zodResolver(signInSchemaValidation),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function handleSignIn({ email, password }: FormDataSignInProps) {
    console.log('E-mail: ', email)
    console.log('password: ', password)
  }

  function goSignUpScreen() {
    navigate('signUp')
  }

  useFocusEffect(
    useCallback(() => {
      reset()
    }, [reset]),
  )

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      className="flex-1 bg-gray-100"
    >
      <View className="w-full flex-1 items-center rounded-b-3xl bg-gray-200 px-12 py-16">
        <View className="items-center justify-center">
          <Logo />
          <Text className="mt-5 text-3xl font-bold text-gray-700">
            marketspace
          </Text>
          <Text className="font-body text-sm leading-[18.2px] text-gray-500">
            Seu espaço de compra e venda
          </Text>
        </View>

        <View className="mt-16 w-full items-center">
          <Text className="mb-4 font-body text-sm leading-[18.2px] text-gray-600">
            Acesse sua conta
          </Text>

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                className={`${
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

          {/* Input de senha */}
          <View
            className={`mt-4 w-full flex-row items-center rounded-md bg-gray-100 px-3 py-4 focus:border focus:border-gray-500 ${
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
                  secureTextEntry={!passwordVisible}
                  onChangeText={onChange}
                  value={value}
                  onSubmitEditing={handleSubmit(handleSignIn)}
                  returnKeyType="send"
                />
              )}
            />

            <TouchableOpacity
              activeOpacity={1}
              onPress={() => setPasswordVisible((prevState) => !prevState)}
            >
              {!passwordVisible ? <EyeClosed size={20} /> : <Eye size={20} />}
            </TouchableOpacity>
          </View>
          {/* mensagem de error */}
          {errors.password?.message && (
            <Text className="self-start font-title text-xs text-red-400">
              {errors.password?.message}
            </Text>
          )}
        </View>

        <Button
          className="mt-8 w-full"
          title="Entrar"
          onPress={handleSubmit(handleSignIn)}
        />
      </View>

      <View className="items-center gap-4 px-12 py-14">
        <Text>Ainda não tem acesso?</Text>
        <Button
          className="w-full"
          title="Criar uma conta"
          variant="light"
          onPress={goSignUpScreen}
        />
      </View>
    </ScrollView>
  )
}
