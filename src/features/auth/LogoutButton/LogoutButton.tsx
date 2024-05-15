'use client'

import React, { FC } from 'react'
import { Button } from 'antd'
import { useAuth } from '@/app/context/AuthContext'

export const LogoutButton: FC = () => {
  const { disconnect } = useAuth()

  return <Button onClick={disconnect}>Logout</Button>
}
