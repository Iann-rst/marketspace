import { ArrowLeft, PencilSimpleLine, Plus } from 'phosphor-react-native'
import { Text, TouchableOpacity, View } from 'react-native'

interface HeaderProps {
  iconLeft?: boolean
  title?: string
  iconRight?: 'plus' | 'edit' | null
  back?: () => void
}

export function Header({
  iconLeft = true,
  title,
  iconRight,
  back,
}: HeaderProps) {
  return (
    <View className="w-full flex-row items-center justify-between px-4">
      {iconLeft ? (
        <TouchableOpacity activeOpacity={0.6} onPress={back}>
          <ArrowLeft size={24} color="#1A181B" weight="regular" />
        </TouchableOpacity>
      ) : (
        <View />
      )}

      {title ? (
        <Text className="font-title text-xl text-gray-700">{title}</Text>
      ) : (
        <View />
      )}

      {iconRight ? (
        <TouchableOpacity activeOpacity={0.6}>
          {iconRight === 'plus' ? (
            <Plus size={24} color="#1A181B" weight="regular" />
          ) : (
            <PencilSimpleLine size={24} color="#1A181B" weight="regular" />
          )}
        </TouchableOpacity>
      ) : (
        <View />
      )}
    </View>
  )
}
