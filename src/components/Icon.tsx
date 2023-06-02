import {
  ArrowLeft,
  Plus,
  Power,
  Tag,
  Trash,
  WhatsappLogo,
} from 'phosphor-react-native'

interface IconProps {
  icon: 'plus' | 'arrow' | 'tag' | 'whatsapp' | 'power' | 'trash' | null
  variant: 'dark' | 'light' | 'main'
}

export function Icon({ icon, variant }: IconProps) {
  return (
    <>
      {icon === 'plus' && (
        <Plus color={variant === 'light' ? '#1A181B' : '#EDECEE'} size={16} />
      )}

      {icon === 'arrow' && (
        <ArrowLeft
          color={variant === 'light' ? '#1A181B' : '#EDECEE'}
          size={16}
        />
      )}

      {icon === 'tag' && (
        <Tag color={variant === 'light' ? '#1A181B' : '#EDECEE'} size={16} />
      )}

      {icon === 'whatsapp' && (
        <WhatsappLogo
          color={variant === 'light' ? '#1A181B' : '#EDECEE'}
          size={16}
          weight="fill"
        />
      )}

      {icon === 'power' && (
        <Power color={variant === 'light' ? '#1A181B' : '#EDECEE'} size={16} />
      )}

      {icon === 'trash' && (
        <Trash color={variant === 'light' ? '#1A181B' : '#EDECEE'} size={16} />
      )}
    </>
  )
}
