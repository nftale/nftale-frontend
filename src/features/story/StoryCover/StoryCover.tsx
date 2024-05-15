'use client'

import { FC, useState } from 'react'
import { Button, Spin } from 'antd'
import { useTranslation } from '@/i18n/client'
import { IStory } from '../type'
import styles from './StoryCover.module.scss'

type Props = {
  story: IStory
  isGenerating: boolean
  onGenerate: () => void
}

export const StoryCover: FC<Props> = ({ story, isGenerating, onGenerate }) => {
  const { t } = useTranslation()

  const [isChanging, setIsChanging] = useState(false)

  const handleSubmit = () => {
    setIsChanging(false)
    onGenerate()
  }

  if (isGenerating) {
    return (
      <div className={styles.cover}>
        <Spin />
      </div>
    )
  }

  return (
    <div className={styles.cover}>
      {story.cover && !isChanging ? (
        <div className={styles.poster}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={story.cover} alt="" className={styles.image} />
        </div>
      ) : (
        <div className={styles.generator}>
          <Button type="primary" onClick={handleSubmit}>
            Generate
          </Button>
        </div>
      )}
    </div>
  )
}
