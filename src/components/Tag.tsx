import { XCircle } from 'phosphor-react-native'
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'

type TagProps = TouchableOpacityProps & {
  isNew?: boolean
  isActive?: boolean
  removeCondition?: () => void
}

export function Tag({
  isActive = false,
  isNew = true,
  removeCondition,
  ...rest
}: TagProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      className={`flex-row items-center space-x-1 self-start rounded-full ${
        isActive ? 'bg-blue-400' : 'bg-gray-300'
      } px-2 py-0.5`}
      {...rest}
    >
      <Text
        className={`font-title text-xs uppercase leading-[130%] ${
          isActive ? 'text-gray-100' : 'text-gray-600'
        }`}
      >
        {isNew ? 'novo' : 'usado'}
      </Text>
      {isActive && (
        <TouchableOpacity onPress={removeCondition}>
          <XCircle size={16} weight="fill" color="#EDECEE" />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  )
}
