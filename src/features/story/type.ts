import { Language } from '@/features/localization/types'
import { UUID } from '@/types/common'

export type StoryOptions = {
  systemMessage?: string
  prompt?: string
  lang?: Language
  scenesNum?: number
  isSimple: boolean
}

export type IStory = StoryOptions & {
  id: UUID
  title: string
  description: string | null
  summary: string | null
  summary_en: string | null
  cover?: string | null
  cover_text?: string | null
  cover_text_en?: string | null
  brief?: string | null
  names?: string[]
  payment_transaction?: string
  payment_date?: string
  created_at: string
  updated_at: string
}
