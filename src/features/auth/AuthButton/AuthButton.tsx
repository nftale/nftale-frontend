'use client'

import React, { FC } from 'react'
import { useAuth } from '@/app/context/AuthContext'
import { LoginButton } from '@/features/auth/LoginButton/LoginButton'
import { LogoutButton } from '@/features/auth/LogoutButton/LogoutButton'

export const AuthButton: FC = () => {
  const { account } = useAuth()

  return !account ? <LoginButton /> : <LogoutButton />
}
