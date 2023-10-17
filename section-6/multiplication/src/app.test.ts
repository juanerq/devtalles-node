import { ServerApp } from "./presentation/server-app";

describe('Test app.ts', () => {

  test('should call Server.run with values', async () => {

    const mockServerRun = jest.fn();
    ServerApp.run = mockServerRun

    process.argv = [
      ...process.argv, 
      '-b', '10',
      '-l', '5', 
      '-s',
      '-n', 'test',
      '-d', 'test-dir'
    ]

    await import('./app')
    
    expect(mockServerRun).toHaveBeenCalledTimes(1)
    expect(mockServerRun).toHaveBeenCalledWith({
      base: 10, 
      limit: 5, 
      showTable: true, 
      fileName: 'test', 
      fileDestination: 'test-dir'
    })

  })

})