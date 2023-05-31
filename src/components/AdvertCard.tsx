import {
  Image,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native'
import { Avatar } from './Avatar'
import { Overlay } from './Overlay'

type AdvertCardProps = TouchableOpacityProps & {
  isActive?: boolean
  isNew?: boolean
  showUser?: boolean
}

export function AdvertCard({
  isActive = true,
  isNew = true,
  showUser = true,
  ...rest
}: AdvertCardProps) {
  return (
    <TouchableOpacity activeOpacity={0.7} className="mb-6 w-40" {...rest}>
      <View>
        <Image
          source={{ uri: 'https://github.com/Iann-rst.png' }}
          alt=""
          className="h-24 w-full rounded-lg"
          resizeMode="cover"
        />

        <View className="absolute left-0 top-0 w-full flex-row items-start justify-between p-1">
          {showUser ? (
            <Avatar
              size={24}
              borderIsBlue={false}
              borderWidth={1}
              source={{ uri: 'https://github.com/Iann-rst.png' }}
            />
          ) : (
            <View />
          )}

          <View
            className={`items-center justify-center rounded-full ${
              isNew ? 'bg-blue-700' : 'bg-gray-600'
            } px-2 py-0.5`}
          >
            <Text className="font-title text-xs uppercase leading-[130%] text-gray-100">
              {isNew ? 'novo' : 'usado'}
            </Text>
          </View>
        </View>

        {/* Overlay */}
        {!isActive && <Overlay />}
      </View>

      {/* Details */}
      <View>
        <Text
          className={`font-body text-sm ${
            isActive ? 'text-gray-600' : 'text-gray-400'
          }`}
        >
          Tênis vermelho
        </Text>
        <Text
          className={`text-xs ${
            isActive ? 'font-title text-gray-700' : 'font-body text-gray-400'
          }`}
        >
          R$
          <Text className="text-base"> 59,90</Text>
        </Text>
      </View>
    </TouchableOpacity>
  )
}
