import { Image, ImageProps } from 'react-native'

type IProps = ImageProps & {}

export function Avatar({ alt, source, ...rest }: IProps) {
  return (
    <Image
      style={{
        borderWidth: 3,
        borderColor: '#647AC7',
      }}
      alt={alt}
      source={source}
      className="h-[88px] w-[88px] rounded-full"
      {...rest}
    />
  )
}
