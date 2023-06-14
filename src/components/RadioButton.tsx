import { Pressable, PressableProps, View } from 'react-native'

type RadioButtonProps = PressableProps & {
  label: string
  value: string | null
}

export function RadioButton({ value, label, ...rest }: RadioButtonProps) {
  return (
    <Pressable
      className={`h-6 w-6 items-center justify-center rounded-full border-2 border-gray-400 ${
        value === label && 'border-blue-400'
      }`}
      {...rest}
    >
      {value === label && <View className="h-4 w-4 rounded-full bg-blue-400" />}
    </Pressable>
  )
}
