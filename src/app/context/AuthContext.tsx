'use client'

import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { LitNetwork } from '@lit-protocol/constants'
import * as LitJsSdk from '@lit-protocol/lit-node-client'
import { ethers } from 'ethers'

const litNodeClient = new LitNodeClient({
  litNetwork: LitNetwork.Habanero,
  debug: false,
})

export type EncryptedResponse = {
  ciphertext: string
  dataToEncryptHash: string
}

type Props = {
  account: string | null
  connect: () => void
  disconnect: () => void
  encryptData: (data: string) => Promise<EncryptedResponse | null>
}

const AuthContext = createContext<Props | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [account, setAccount] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedAccount = localStorage.getItem('account')
      if (savedAccount) {
        setAccount(savedAccount)
      }
    }
  }, [])

  const connect = async () => {
    if (typeof window !== 'undefined' && (window as any).ethereum) {
      const provider = new ethers.providers.Web3Provider((window as any).ethereum)
      await provider.send('eth_requestAccounts', [])
      const signer = provider.getSigner()
      const account = await signer.getAddress()
      setAccount(account)
      localStorage.setItem('account', account)
    } else {
      console.error('Metamask not found')
    }
  }

  const disconnect = async () => {
    await litNodeClient.disconnect()
    setAccount(null)
    if (typeof window !== 'undefined') {
      localStorage.removeItem('account')
    }
  }

  const encryptData = async (data: string) => {
    // https://developer.litprotocol.com/v3/sdk/access-control/quick-start#performing-decryption
    if (!litNodeClient) {
      console.error('LIT Node Client not initialized')
      return null
    }

    if (!account) {
      console.error('User not authenticated')
      return null
    }

    const nonce = await litNodeClient.getLatestBlockhash()

    const authSig = await LitJsSdk.checkAndSignAuthMessage({
      chain: 'ethereum',
      nonce,
    })

    const accessControlConditions = [
      {
        contractAddress: '',
        standardContractType: '',
        chain: 'ethereum',
        method: 'eth_getBalance',
        parameters: [':userAddress', 'latest'],
        returnValueTest: {
          comparator: '>=',
          value: '1000000000000',
        },
      },
    ]

    const { ciphertext, dataToEncryptHash } = await LitJsSdk.encryptString(
      { accessControlConditions, authSig, dataToEncrypt: data, chain: 'ethereum' },
      litNodeClient,
    )

    return { ciphertext, dataToEncryptHash }
  }

  return (
    <AuthContext.Provider value={{ account, connect, disconnect, encryptData }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
