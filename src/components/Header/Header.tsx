import { FC, PropsWithChildren } from 'react'
import { Header as AntHeader } from 'antd/es/layout/layout'
import Link from 'next/link'
import { AuthButton } from '@/features/auth/AuthButton/AuthButton'
import { createTranslation } from '@/i18n/server'
import { Container } from '../Container/Container'
import styles from './Header.module.scss'

export const Header: FC<PropsWithChildren> = async () => {
  const { t } = await createTranslation()

  return (
    <AntHeader className={styles.header}>
      <Container className={styles.wrapper}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoText}>NFTale</span>
        </Link>

        <ul className={styles.menuList}>
          <li className={styles.menuItem}>
            <Link href="/projects" className={styles.menuLink}>
              {t('header.projects')}
            </Link>
          </li>
        </ul>

        <AuthButton />
      </Container>
    </AntHeader>
  )
}
