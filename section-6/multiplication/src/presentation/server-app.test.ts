import { CreateTable } from "../domain/use-cases/create-table.use-case"
import { SaveFile } from "../domain/use-cases/save-file.use-case"
import { ServerApp } from "./server-app"

describe('Server App', () => {

  const options = {
    base: 2,
    limit: 10,
    showTable: false,
    fileDestination: 'test-destination',
    fileName: 'test-filename'
  }

  test('should create ServerApp instance', () => {

    const serverApp = new ServerApp()

    expect(serverApp).toBeInstanceOf(ServerApp)
    expect(typeof ServerApp.run).toBe('function')

  })

  test('should run ServerApp with options', () => {

    const logSpy = jest.spyOn(console, 'log')
    const createTableSpy = jest.spyOn(CreateTable.prototype, 'execute')
    const saveFileSpy = jest.spyOn(SaveFile.prototype, 'execute')

    ServerApp.run(options)

    expect(logSpy).toHaveBeenCalledTimes(2)
    expect(logSpy).toHaveBeenCalledWith('Server running...')
    expect(logSpy).toHaveBeenLastCalledWith('File was created successfully')

    expect(createTableSpy).toHaveBeenCalledTimes(1)
    expect(createTableSpy).toHaveBeenCalledWith({ base: options.base, limit: options.limit })

    expect(saveFileSpy).toHaveBeenCalledTimes(1)
    expect(saveFileSpy).toHaveBeenCalledWith({ 
      fileName: options.fileName, fileDestination: options.fileDestination, fileContent: expect.any(String)
    })

  })

  test('should run with custom values mocked', () => {

    const returnValueCreateMock = '1 x 2 = 2'

    const logErrorMock = jest.fn()
    const logMock = jest.fn()
    const createMock = jest.fn().mockReturnValue(returnValueCreateMock)
    const saveFileMock = jest.fn().mockReturnValue(true)

    console.log = logMock
    console.error = logErrorMock
    CreateTable.prototype.execute = createMock
    SaveFile.prototype.execute = saveFileMock

    ServerApp.run(options)

    expect(logMock).toHaveBeenCalledWith('Server running...')
    expect(createMock).toHaveBeenLastCalledWith({ base: options.base, limit: options.limit })
    expect(saveFileMock).toHaveBeenLastCalledWith({
      fileName: options.fileName, fileDestination: options.fileDestination, fileContent: returnValueCreateMock
    })
    expect(logMock).toHaveBeenLastCalledWith('File was created successfully')
    expect(logErrorMock).not.toHaveBeenCalled()

  })

})