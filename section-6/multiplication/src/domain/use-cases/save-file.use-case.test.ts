import fs from 'node:fs'
import { SaveFile } from "./save-file.use-case"

describe('SaveFileUseCase', () => {

  afterEach(() => {
    const dirsToDelete = ['outputs', 'custom-outputs']
    dirsToDelete.forEach(dir => {
      if(fs.existsSync(dir)) fs.rmSync(dir, { recursive: true })
    })
  })

  test('should sabe file with default values', () => {

    const saveFile = new SaveFile()
    const filePath = 'outputs/table.txt'
    const options = {
      fileContent: 'text content'
    }

    const result = saveFile.execute(options)

    const fileExists = fs.existsSync(filePath)
    const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' })

    expect(saveFile).toBeInstanceOf(SaveFile)
    expect(result).toBeTruthy()
    expect(fileExists).toBeTruthy()
    expect(fileContent).toBe(options.fileContent)

  })

  test('should save file with custom values', () => {
    const options = {
      fileContent: 'custom content',
      fileDestination: 'custom-outputs/file-destination',
      fileName: 'custom-table-name'
    }

    const saveFile = new SaveFile()
    const result = saveFile.execute(options)

    const filePath = `${options.fileDestination}/${options.fileName}.txt`
    
    const fileExists = fs.existsSync(filePath)
    const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' })

    expect(saveFile).toBeInstanceOf(SaveFile)
    expect(result).toBeTruthy()
    expect(fileExists).toBeTruthy()
    expect(fileContent).toBe(options.fileContent)
  })

  test('should return false if directory could not be created', () => {

    const saveFile = new SaveFile()
    const mkdirMock = jest.spyOn(fs, 'mkdirSync').mockImplementationOnce(
      () => { throw new Error('This is a custom error message from testing') }
    )

    const result = saveFile.execute({ fileContent: 'text content' })

    expect(result).toBeFalsy()

    mkdirMock.mockRestore()
  })

  test('should return false if file could not be created', () => {

    const saveFile = new SaveFile()
    const mkdirMock = jest.spyOn(fs, 'writeFileSync').mockImplementationOnce(
      () => { throw new Error('This is a custom writing error message from testing') }
    )

    const result = saveFile.execute({ fileContent: 'text content' })

    expect(result).toBeFalsy()

    mkdirMock.mockRestore()
  })
})