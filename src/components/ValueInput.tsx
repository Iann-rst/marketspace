import { Text, TextInputProps, View } from 'react-native'
import { Input } from './Input'

type ValueInputProps = TextInputProps & {
  errorMessage?: string
}

export function ValueInput({ errorMessage, ...rest }: ValueInputProps) {
  return (
    <>
      <View
        className={`mt-4 w-full flex-row items-center space-x-2 rounded-md bg-gray-100 px-3 py-4 focus:border focus:border-gray-500 ${
          errorMessage ? 'border border-red-400 focus:border-red-400' : ''
        }`}
      >
        <Text className="font-body text-base leading-[130%] text-gray-700">
          R$
        </Text>
        <Input
          placeholder="Valor do produto"
          className="flex-1 px-0 py-0 focus:border-0"
          keyboardType="decimal-pad"
          {...rest}
        />
      </View>
      {errorMessage && (
        <Text className="self-start font-title text-xs text-red-400">
          {errorMessage}
        </Text>
      )}
    </>
  )
}
