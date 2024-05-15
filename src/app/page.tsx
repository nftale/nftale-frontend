import type { Metadata } from 'next'
import { Hero } from '@/components/Hero/Hero'
import { ClientField } from '@/features/laboratory/ClientField/ClientField'
import { createTranslation } from '@/i18n/server'

export const metadata: Metadata = {
  title: 'NFTale',
  description: 'Alternative history generator',
}

export default async function Home() {
  const { t } = await createTranslation()

  return (
    <>
      <Hero title={t('HomePage.title')} ctaText={t('HomePage.cta')} ctaUrl="/projects" />
      <br />
      <ClientField />
    </>
  )
}
