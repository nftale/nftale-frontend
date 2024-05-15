'use client'

import React from 'react'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/app/context/AuthContext'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { account } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!account) {
      router.push('/')
    }
  }, [account, router])

  if (!account) {
    return null
  }

  return <>{children}</>
}

export default ProtectedRoute
