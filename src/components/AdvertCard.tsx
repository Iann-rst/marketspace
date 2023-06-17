import {
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native'
import { ProductDTO } from '../dtos/ProductDTO'
import { api } from '../services/api'
import { Avatar } from './Avatar'
import { Overlay } from './Overlay'

type ProductDataProps = TouchableOpacityProps & {
  product: ProductDTO
}

export function AdvertCard({ product, ...rest }: ProductDataProps) {
  const dimension = Dimensions.get('window').width - 48
  const width = dimension / 2 - 10

  return (
    <TouchableOpacity
      style={{
        width,
      }}
      activeOpacity={0.7}
      className="mb-6"
      {...rest}
    >
      <View>
        <Image
          source={{
            uri: `${api.defaults.baseURL}/images/${product.product_images[0].path}`,
          }}
          alt=""
          className="h-24 w-full rounded-lg"
          resizeMode="cover"
        />

        <View className="absolute left-0 top-0 w-full flex-row items-start justify-between p-1">
          {product.user ? (
            <Avatar
              size={24}
              borderIsBlue={false}
              borderWidth={1}
              source={{
                uri: `${api.defaults.baseURL}/images/${product.user.avatar}`,
              }}
            />
          ) : (
            <View />
          )}

          <View
            className={`items-center justify-center rounded-full ${
              product.is_new ? 'bg-blue-700' : 'bg-gray-600'
            } px-2 py-0.5`}
          >
            <Text className="font-title text-xs uppercase leading-[130%] text-gray-100">
              {product.is_new ? 'novo' : 'usado'}
            </Text>
          </View>
        </View>

        {/* Overlay */}
        {!product.is_active && <Overlay />}
      </View>

      {/* Details */}
      <View>
        <Text
          className={`font-body text-sm ${
            product.is_active ? 'text-gray-600' : 'text-gray-400'
          }`}
        >
          {product.name}
        </Text>
        <Text
          className={`text-xs ${
            product.is_active
              ? 'font-title text-gray-700'
              : 'font-body text-gray-400'
          }`}
        >
          R$
          <Text className="text-base">
            {' '}
            {parseFloat(product.price).toFixed(2)}
          </Text>
        </Text>
      </View>
    </TouchableOpacity>
  )
}
