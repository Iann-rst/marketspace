import { ArrowRight, Tag } from 'phosphor-react-native'
import { Text, TouchableOpacity, View } from 'react-native'

export function MyAdvertsCard() {
  return (
    <View className="mb-8 mt-8 space-y-3">
      <Text className="font-body text-sm leading-[18.2px] text-gray-500">
        Seus produtos anunciados para venda
      </Text>
      <View className="flex-row items-center justify-between rounded-md bg-blue-400/10 px-4 py-3">
        <View className="flex-row items-center space-x-4">
          <Tag size={22} color="#364D9D" />
          <View>
            <Text className="font-title text-xl leading-[130%] text-gray-700">
              4
            </Text>
            <Text className="font-body text-xs leading-[130%] text-gray-600">
              anúncios ativos
            </Text>
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          className="flex-row items-center justify-center space-x-2"
        >
          <Text className="font-title text-xs leading-[15.6px] text-blue-700">
            Meus anúncios
          </Text>
          <ArrowRight size={16} color="#364D9D" />
        </TouchableOpacity>
      </View>
    </View>
  )
}
