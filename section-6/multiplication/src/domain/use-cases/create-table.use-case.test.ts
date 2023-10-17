import { CreateTable } from "./create-table.use-case"

describe('CreateTableUseCase', () => {
  test('should by create table with defaults value', () => {
    const base = 5

    const createTable = new CreateTable()
    const table = createTable.execute({ base: 5 })

    const rows = table.split('\n')

    expect(createTable).toBeInstanceOf(CreateTable)
    expect(table).toContain(`${base} x 1 = ${base * 1}`)
    expect(table).toContain(`${base} x 10 = ${base * 10}`)
    expect(rows.length).toBe(10)
  })

  test('should by create table with custom params', () => {
    const params = { base: 5, limit: 15 }

    const createTable = new CreateTable()
    const table = createTable.execute(params)
    const rows = table.split('\n')

    expect(createTable).toBeInstanceOf(CreateTable)
    expect(table).toContain(`${params.base} x 1 = ${params.base * 1}`)
    expect(table).toContain(`${params.base} x ${params.limit} = ${params.base * params.limit}`)
    expect(rows.length).toBe(params.limit)
  })

})
  
