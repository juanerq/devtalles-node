export const enum LogSeverityLevel {
  low = 'low',
  medium = 'medium',
  high = 'high'
}

export interface LogEntityOptions {
  message: string
  level: LogSeverityLevel
  createdAt?: Date
  origin: string
}

export class LogEntity {
  public message: string
  public level: LogSeverityLevel
  public createdAt: Date
  public origin: string

  constructor({ message, level, createdAt, origin }: LogEntityOptions) {
    this.message = message
    this.level = level
    this.createdAt = createdAt ?? new Date()
    this.origin = origin
  }

  static fromJson(json: string): LogEntity {
    const { message, level, createdAt } = JSON.parse(json)

    const log = new LogEntity({ level, message, createdAt: new Date(createdAt), origin })

    return log
  }

}