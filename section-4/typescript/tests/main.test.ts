import { getChannel } from '../src/main'

describe('Test in the Main file', () => {
  it('should be 5', () => {
    // 1. Arrange
    const num1 = 2
    const num2 = 3

    // 2. Act
    const result = num1 + num2

    // 3. Assert
    expect(result).toBe(5)
  })

  it('should be type channel INBOUND & OUTBOUND', () => {
    const channel = getChannel('LLAMADA')
    
    expect(channel.type).toContain('INBOUND')
    expect(channel.type).toContain('OUTBOUND')

  })
})