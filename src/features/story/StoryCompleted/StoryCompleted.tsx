import { FC } from 'react'
import styles from './StoryCompleted.module.scss'

type Props = {}

export const StoryCompleted: FC<Props> = () => {
  return <div className={styles.completed}>completed</div>
}
