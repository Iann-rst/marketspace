import axios, { AxiosInstance } from 'axios'
import { AppError } from '../utils/error/AppError'

type SignOut = () => void

type APIInstanceProps = AxiosInstance & {
  registerInterceptTokenManager: (signOut: SignOut) => () => void
}

export const api = axios.create({
  baseURL: 'http://10.0.0.138:3333',
}) as APIInstanceProps

api.registerInterceptTokenManager = (signOut) => {
  const interceptTokenManager = api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.data) {
        return Promise.reject(new AppError(error.response.data.message))
      } else {
        return Promise.reject(error)
      }
    },
  )

  return () => {
    api.interceptors.response.eject(interceptTokenManager)
  }
}
