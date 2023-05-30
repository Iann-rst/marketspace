import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { Loading } from './Loading'

type ButtonProps = TouchableOpacityProps & {
  title: string
  variant?: 'dark' | 'light' | 'main'
  isLoading?: boolean
}

export function Button({
  title,
  variant = 'main',
  isLoading = false,
  ...rest
}: ButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      className={`mt-8 h-11 flex-row items-center justify-center space-x-2 rounded-md ${
        variant === 'main'
          ? 'bg-blue-400'
          : variant === 'light'
          ? 'bg-gray-300'
          : 'bg-gray-700'
      } px-3 py-3`}
      {...rest}
    >
      {isLoading ? (
        <Loading />
      ) : (
        <Text
          className={`font-title text-sm ${
            variant === 'main'
              ? 'text-gray-100'
              : variant === 'light'
              ? 'text-gray-600'
              : 'text-gray-100'
          }`}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  )
}
