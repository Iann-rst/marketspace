import { TextInput, TextInputProps } from 'react-native'

type InputProps = TextInputProps & {}

export function Input({ ...rest }: InputProps) {
  return (
    <TextInput
      placeholderTextColor="#9F9BA1"
      className="w-full rounded-md bg-gray-100 px-3 py-4 text-gray-600 focus:border focus:border-gray-500"
      autoCapitalize="none"
      autoCorrect={false}
      {...rest}
    />
  )
}
