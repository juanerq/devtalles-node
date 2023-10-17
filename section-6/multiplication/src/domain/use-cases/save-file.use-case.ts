import fs from 'fs'

export interface SaveFileUseCase {
  execute: ( options: Options ) => boolean
}

interface Options {
  fileContent: string
  fileDestination?: string
  fileName?: string
}

export class SaveFile implements SaveFileUseCase {
  constructor(

  ){}

  execute ({ 
    fileContent,
    fileDestination = 'outputs', 
    fileName = 'table',
  }: Options) {
    try {
      const path = `${fileDestination}/${fileName}.txt`

      fs.mkdirSync(fileDestination, { recursive: true })
      fs.writeFileSync(path, fileContent)

      return true
    } catch(error) {
      console.error(error);
      return false
    }
  };
}