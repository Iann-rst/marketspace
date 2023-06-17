import { Text, View } from 'react-native'

type OverlayProps = {
  isCentralized?: boolean
}

export function Overlay({ isCentralized = false }: OverlayProps) {
  return (
    <View
      className={`absolute h-full w-full ${
        isCentralized ? 'items-center justify-center' : 'justify-end rounded-lg'
      } bg-gray-700/60 p-2`}
    >
      <Text className="font-title text-xs uppercase text-gray-100">
        anúncio desativado
      </Text>
    </View>
  )
}
