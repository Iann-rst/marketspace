import { createContext, ReactNode, useEffect, useState } from 'react'
import { UserDTO } from '../dtos/UserDTO'

export type AuthContextDataProps = {
  user: UserDTO
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

type AuthContextProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps,
)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO)

  async function signIn(email: string, password: string) {
    // fazer login do usuário na api, salvar o token e dados do usuário no async-storage/secure-store
  }

  async function signOut() {
    // deslogar o usuário, remover token e dados do usuário do async-storage/secure-store
  }

  async function loadUserData() {
    // carregar os dados do usuário, buscar no async-storage/secure-store e pegar o token tbm
  }

  // useEffect para buscar os dados do usuário
  useEffect(() => {
    loadUserData()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
