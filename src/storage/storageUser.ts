import * as SecureStore from 'expo-secure-store'
import { UserDTO } from '../dtos/UserDTO'
import { USER_STORAGE } from './storageConfig'

export async function storageUserSave(user: UserDTO) {
  await SecureStore.setItemAsync(USER_STORAGE, JSON.stringify(user))
}

export async function storageUserGet() {
  const storage = await SecureStore.getItemAsync(USER_STORAGE)

  const user: UserDTO = storage ? JSON.parse(storage) : []

  return user
}

export async function storageUserRemove() {
  await SecureStore.deleteItemAsync(USER_STORAGE)
}
