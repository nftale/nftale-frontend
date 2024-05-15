'use client'

import React, { FC, useState } from 'react'
import { Button, Input } from 'antd'
import { EncryptedResponse, useAuth } from '@/app/context/AuthContext'

export const EncryptContent: FC = () => {
  const { account, encryptData } = useAuth()
  const [input, setInput] = useState<string>('')
  const [encryptedData, setEncryptedData] = useState<EncryptedResponse | null>(null)

  const handleEncrypt = async () => {
    if (!input || !encryptData) return
    try {
      const encrypted = await encryptData(input)
      setEncryptedData(encrypted)
      setInput('')
    } catch (error) {
      console.error(error)
    }
  }

  if (!account) return null

  return (
    <div>
      <Input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Enter data to encrypt"
      />
      <Button type="primary" disabled={!input} onClick={handleEncrypt}>
        Encrypt Data
      </Button>
      {encryptedData && (
        <div>
          Encrypted Data: {encryptedData.ciphertext} / {encryptedData.dataToEncryptHash}
        </div>
      )}
    </div>
  )
}
