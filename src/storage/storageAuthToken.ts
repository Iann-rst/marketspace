import * as SecureStore from 'expo-secure-store'
import { AUTH_TOKEN_STORAGE } from './storageConfig'

type StorageAuthTokenProps = {
  token: string
  refresh_token: string
}

export async function storageAuthTokenSave({
  token,
  refresh_token,
}: StorageAuthTokenProps) {
  await SecureStore.setItemAsync(
    AUTH_TOKEN_STORAGE,
    JSON.stringify({ token, refresh_token }),
  )
}

export async function storageAuthTokenGet() {
  const storage = await SecureStore.getItemAsync(AUTH_TOKEN_STORAGE)

  const { token, refresh_token }: StorageAuthTokenProps = storage
    ? JSON.parse(storage)
    : {}

  return { token, refresh_token }
}

export async function storageAuthTokenRemove() {
  await SecureStore.deleteItemAsync(AUTH_TOKEN_STORAGE)
}
