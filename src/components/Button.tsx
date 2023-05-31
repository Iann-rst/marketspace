import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native'
import { Icon } from './Icon'
import { Loading } from './Loading'

type ButtonProps = TouchableOpacityProps & {
  title: string
  variant?: 'dark' | 'light' | 'main'
  isLoading?: boolean
  icon?: 'plus' | 'arrow' | 'tag' | 'whatsapp' | 'power' | 'trash' | null
}

export function Button({
  title,
  variant = 'main',
  icon = null,
  isLoading = false,
  ...rest
}: ButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      className={`h-11 rounded-md ${
        variant === 'main'
          ? 'bg-blue-400'
          : variant === 'light'
          ? 'bg-gray-300'
          : 'bg-gray-700'
      }`}
      {...rest}
    >
      <View className="flex-row items-center justify-center space-x-2 px-3 py-3">
        {isLoading ? (
          <Loading />
        ) : (
          <>
            {icon && <Icon icon={icon} variant={variant} />}

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
          </>
        )}
      </View>
    </TouchableOpacity>
  )
}
