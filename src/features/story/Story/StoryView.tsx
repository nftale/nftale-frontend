'use client'

import { FC } from 'react'
import { Heading } from '@/components/Heading/Heading'
import { IStory } from '../type'
import styles from './Story.module.scss'

type StoryProps = {
  story: IStory
}

export const StoryView: FC<StoryProps> = ({ story }) => {
  if (!story) return null

  return (
    <article className={styles.story}>
      <Heading isCentered title={story.title} />
    </article>
  )
}
