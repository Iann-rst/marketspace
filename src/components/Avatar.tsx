import { Image, ImageProps } from 'react-native'

type IProps = ImageProps & {
  size: number
  borderWidth: number
  borderIsBlue: boolean
}

export function Avatar({
  size,
  borderIsBlue,
  borderWidth,
  alt,
  source,
  ...rest
}: IProps) {
  return (
    <Image
      style={{
        borderWidth,
        borderColor: borderIsBlue ? '#647AC7' : '#F7F7F8',
        width: size,
        height: size,
      }}
      alt={alt}
      source={source}
      className="rounded-full"
      {...rest}
    />
  )
}
