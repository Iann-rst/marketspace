import { MagnifyingGlass, Sliders } from 'phosphor-react-native'
import { Text, TouchableOpacity, View } from 'react-native'
import { Input } from './Input'

export function SearchInput() {
  return (
    <View className="space-y-3">
      <Text className="font-body text-sm leading-[18.2px] text-gray-500">
        Compre produtos variados
      </Text>

      <View className="flex-row items-center space-x-3 rounded-md bg-gray-100 px-3 py-4 focus:border focus:border-gray-500">
        <Input
          className="flex-1 p-0 focus:border-0"
          placeholder="Buscar anúncio"
        />
        <TouchableOpacity>
          <MagnifyingGlass size={20} weight="bold" color="#3E3A40" />
        </TouchableOpacity>
        <View className="h-5 w-0 border-l border-gray-400/50" />
        <TouchableOpacity>
          <Sliders size={20} weight="bold" color="#3E3A40" />
        </TouchableOpacity>
      </View>
    </View>
  )
}
