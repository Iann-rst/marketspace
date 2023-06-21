/* eslint-disable prettier/prettier */
import axios, { AxiosError, AxiosInstance } from 'axios'
import { storageAuthTokenGet, storageAuthTokenSave } from '../storage/storageAuthToken'
import { AppError } from '../utils/error/AppError'

type SignOut = () => void
type PromiseType = {
  onSuccess: (token: string) => void
  onFailure: (error: AxiosError) => void
}
type APIInstanceProps = AxiosInstance & {
  registerInterceptTokenManager: (signOut: SignOut) => () => void
}

export const api = axios.create({
  baseURL: 'http://10.0.0.138:3333',
}) as APIInstanceProps

let failedQueue: PromiseType[] = [] // Fila com as requisições
let isRefreshing = false

api.registerInterceptTokenManager = (signOut) => {
  const interceptTokenManager = api.interceptors.response.use(
    (response) => response,
    async (requestError) => {
      if (requestError?.response?.status === 401) {
        if (
          requestError.response.data?.message === 'token.invalid'
        ) {
          /**
           * Fazer a lógica de buscar por um novo token:
           *
           * 1º Recuperar o refresh_token do usuário
           * 2º Adicionar a requisição na fila de requisição (para não perder a requisição que foi feita quando o token era inválido)
           */

          const {  refresh_token } = await storageAuthTokenGet()

          if (!refresh_token) {
            signOut()
            return Promise.reject(requestError)
          }

          const originalRequestConfig = requestError.config

          if (isRefreshing) {
            return new Promise((resolve, reject) => {
              failedQueue.push({
                onSuccess: (token: string) => {
                  originalRequestConfig.headers.Authorization =`Bearer ${token}`
                  resolve(api(originalRequestConfig))
                },
                onFailure: (error: AxiosError) => {
                  reject(error)
                },
              } as PromiseType)
            })
          }


          isRefreshing = true

          return new Promise(async (resolve, reject) => {
            try {
              const { data } = await api.post('sessions/refresh-token', {
                refresh_token,
              })
              await storageAuthTokenSave({token: data.token, refresh_token: data.refresh_token})

              if(originalRequestConfig.data){
                originalRequestConfig.data = JSON.parse(originalRequestConfig.data);
              }

              originalRequestConfig.headers.Authorization =`Bearer ${data.token}`;
              api.defaults.headers.common.Authorization = `Bearer ${data.token}`;

              failedQueue.forEach(request => {
                request.onSuccess(data.token);
              });

              console.log('TOKEN ATUALIZADO')
              resolve(api(originalRequestConfig));

            } catch (error) {
              failedQueue.forEach((request) => {
                request.onFailure(error)
              })
              signOut()
              reject(error)
            } finally {
              isRefreshing = true
              failedQueue = []
            }
          })
        }else{
          signOut()
        }
      }

      if (requestError.response && requestError.response.data) {
        return Promise.reject(new AppError(requestError.response.data.message))
      } else {
        return Promise.reject(requestError)
      }
    },
  )

  return () => {
    api.interceptors.response.eject(interceptTokenManager)
  }
}
