'use client'

import { FC } from 'react'
import { notification } from 'antd'
import { Spinner } from '@/components/Spinner/Spinner'
import { useTranslation } from '@/i18n/client'
import { StoryWrapper } from '../StoryWrapper/StoryWrapper'
import { useFetchAllStories } from '../hooks/fetch-stories.hook'
import { useStoryStore } from '../storyStore'
import { StoryView } from './StoryView'

type StoryProps = {
  storyId: string
  siteUrl: string
  serviceWallet?: string
}

export const Story: FC<StoryProps> = ({ storyId, siteUrl }) => {
  const { t } = useTranslation()

  useFetchAllStories()
  const { isStoriesLoading, getStoryById } = useStoryStore()

  const initialStory = getStoryById(storyId)

  const [api, contextHolder] = notification.useNotification()

  if (isStoriesLoading) {
    return <Spinner content={t('StoryPage.storiesLoading')} />
  }

  if (!initialStory) return null

  return (
    <>
      <StoryWrapper siteUrl={siteUrl}>
        <StoryView story={initialStory} />
      </StoryWrapper>

      {contextHolder}
    </>
  )
}
