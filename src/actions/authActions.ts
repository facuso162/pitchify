'use server'

import { signIn, signOut } from '@/src/auth'

export const singInAction = async () => {
  await signIn()
}

export const singOutAction = async () => {
  await signOut({ redirectTo: '/' })
}
