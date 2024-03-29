/* eslint-disable no-useless-catch */
import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { UserDTO } from '../dtos/UserDTO'
import { api } from '../services/api'
import {
  storageAuthTokenGet,
  storageAuthTokenRemove,
  storageAuthTokenSave,
} from '../storage/storageAuthToken'
import {
  storageUserGet,
  storageUserRemove,
  storageUserSave,
} from '../storage/storageUser'

export type AuthContextDataProps = {
  user: UserDTO
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  isLoadingUser: boolean
}

type AuthContextProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps,
)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO)
  const [isLoadingUser, setIsLoadingUser] = useState(true)

  // colocar token no cabeçalho da requisição e salvar o usuário no useState
  function userAndTokenUpdate(userData: UserDTO, token: string) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`
    setUser(userData)
  }

  // Salvar usuário e o token no storage (SecureStorage)
  async function storageUserAndTokenSave(
    userData: UserDTO,
    token: string,
    refresh_token: string,
  ) {
    try {
      setIsLoadingUser(true)
      await storageUserSave(userData)
      await storageAuthTokenSave({ token, refresh_token })
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUser(false)
    }
  }

  async function signIn(email: string, password: string) {
    // fazer login do usuário na api, salvar o token e dados do usuário no async-storage/secure-store

    try {
      setIsLoadingUser(true)
      const { data } = await api.post('/sessions', { email, password })
      if (data.user && data.token && data.refresh_token) {
        await storageUserAndTokenSave(data.user, data.token, data.refresh_token)
        userAndTokenUpdate(data.user, data.token)
      }
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUser(false)
    }
  }

  const signOut = useCallback(async () => {
    // deslogar o usuário, remover token e dados do usuário do async-storage/secure-store
    try {
      setIsLoadingUser(true)
      setUser({} as UserDTO)
      await storageUserRemove()
      await storageAuthTokenRemove()
      api.defaults.headers.common.Authorization = ''
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUser(false)
    }
  }, [])

  // useEffect para buscar os dados do usuário
  useEffect(() => {
    async function loadUserData() {
      // carregar os dados do usuário, buscar no async-storage/secure-store e pegar o token tbm
      try {
        setIsLoadingUser(true)
        const userLogged = await storageUserGet()
        const { token } = await storageAuthTokenGet()

        if (userLogged && token) {
          userAndTokenUpdate(userLogged, token)
        }
      } catch (error) {
        throw error
      } finally {
        setIsLoadingUser(false)
      }
    }

    loadUserData()
  }, [])

  // Assim que a aplicação carregar, passa o signOut para dentro da api.registerInterceptTokenManage
  useEffect(() => {
    const subscribe = api.registerInterceptTokenManager(signOut)

    return () => {
      subscribe()
    }
  }, [signOut])

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signOut,
        isLoadingUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
