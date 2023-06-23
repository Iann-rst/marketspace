import { ErrorToast, InfoToast } from 'react-native-toast-message'
import { theme } from '..'

export const toastConfig = {
  error: (props) => (
    <ErrorToast
      {...props}
      style={{
        borderLeftColor: '#F44336',
        backgroundColor: '#FFEBEE',
      }}
      text1Style={{
        fontSize: 18,
        fontFamily: theme.fontFamily.title,
        color: theme.colors.gray[700],
      }}
      text2Style={{
        fontSize: 16,
        fontFamily: theme.fontFamily.body,
        color: theme.colors.gray[500],
      }}
    />
  ),

  info: (props) => (
    <InfoToast
      {...props}
      style={{
        borderLeftColor: theme.colors.blue[700],
        backgroundColor: '#F0F8FF',
      }}
      text1Style={{
        fontSize: 18,
        fontFamily: theme.fontFamily.title,
        color: theme.colors.gray[700],
      }}
      text2Style={{
        fontSize: 16,
        fontFamily: theme.fontFamily.body,
        color: theme.colors.gray[500],
      }}
    />
  ),
}
