import Dexie, { Table } from 'dexie'
import { IStory } from '../../features/story/type'

const dbName = 'nftile'

interface IDexieDB extends Dexie {
  stories: Table<IStory>
}

class MyDexieDB extends Dexie implements IDexieDB {
  stories!: Table<IStory>

  constructor() {
    super(dbName)
    this.version(1).stores({
      stories: 'id',
    })
  }
}

export const localDB = new MyDexieDB()

export const clearDatabase = () => {
  Dexie.delete(dbName)
    .then(() => {
      console.log(`Database "${dbName}" deleted successfully.`)
    })
    .catch(error => {
      console.error(`Failed to delete database "${dbName}".`, error)
    })
}
