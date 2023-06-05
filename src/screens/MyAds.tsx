import { FlatList, Text, View } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { useEffect, useState } from 'react'
import { AdvertCard } from '../components/AdvertCard'
import { Header } from '../components/Header'

interface SelectProps {
  label: string
  value: string
}

export function MyAds() {
  const { bottom, top } = useSafeAreaInsets()
  const [value, setValue] = useState<string>('todos')
  const [myAds, setMyAds] = useState([
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
  ])

  const select: SelectProps[] = [
    { label: 'Todos', value: 'todos' },
    { label: 'Ativos', value: 'ativos' },
    { label: 'Inativos', value: 'inativos' },
  ]

  const renderItem = (item: SelectProps) => {
    return (
      <View className="rounded-md bg-gray-100 px-3 py-1.5">
        <Text
          className={`text-sm text-gray-600 ${
            item.value === value ? 'font-title' : 'font-body'
          }`}
        >
          {item.label}
        </Text>
      </View>
    )
  }

  // Buscar os anúncios na api
  useEffect(() => {
    console.log(value)
  }, [value])

  return (
    <View
      style={{ paddingTop: top + 20, paddingBottom: bottom }}
      className="flex-1 bg-gray-200"
    >
      <Header iconLeft={false} title="Meus anúncios" iconRight="plus" />
      <View className="mt-8 flex-1 px-6">
        <View className="mb-5 flex-row items-center justify-between">
          <Text className="font-body text-sm leading-[130%] text-gray-600">
            9 anúncios
          </Text>
          <Dropdown
            style={{
              width: 110,
              height: 34,
              borderWidth: 1,
              borderColor: '#D9D8DA',
              borderRadius: 6,
              paddingVertical: 6,
              paddingHorizontal: 12,
            }}
            selectedTextStyle={{
              fontSize: 14,
              lineHeight: 18,
              color: '#3E3A40',
            }}
            containerStyle={{
              borderRadius: 6,
            }}
            data={select}
            value={value}
            placeholder="Todos"
            labelField="label"
            valueField="value"
            onChange={(item) => setValue(item.value)}
            renderItem={renderItem}
          />
        </View>

        <FlatList
          contentContainerStyle={{
            paddingBottom: 40,
          }}
          data={myAds}
          keyExtractor={(item) => item}
          renderItem={(item) => <AdvertCard showUser={false} />}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  )
}
