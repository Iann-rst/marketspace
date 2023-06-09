import { Text, TextInput, TextInputProps } from 'react-native'

type InputProps = TextInputProps & {
  errorMessage?: string
}

export function Input({ errorMessage, ...rest }: InputProps) {
  return (
    <>
      <TextInput
        placeholderTextColor="#9F9BA1"
        className="w-full rounded-md bg-gray-100 px-3 py-4 font-body text-base leading-[130%] text-gray-600 focus:border focus:border-gray-500"
        autoCapitalize="none"
        autoCorrect={false}
        {...rest}
      />
      {errorMessage && (
        <Text className="self-start font-title text-xs text-red-400">
          {errorMessage}
        </Text>
      )}
    </>
  )
}
