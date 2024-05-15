import type { Metadata } from 'next'
import { Container } from '@/components/Container/Container'

export const metadata: Metadata = {
  title: 'NFTale',
  description: 'Alternative history generator',
}

export default async function Home() {
  return <Container>HomePage</Container>
}
