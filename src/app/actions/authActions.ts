'use server'

import { signIn, signOut } from '@/auth'

export const singInAction = async () => {
  await signIn()
}

export const singOutAction = async () => {
  await signOut({ redirectTo: '/' })
}
