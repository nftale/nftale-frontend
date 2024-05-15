'use client'

import React, { FC } from 'react'
import { Button } from 'antd'
import { useAuth } from '@/app/context/AuthContext'

export const LoginButton: FC = () => {
  const { connect } = useAuth()

  return <Button onClick={connect}>Login with Metamask</Button>
}
