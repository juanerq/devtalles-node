import { EmailService } from "../../../presentation/email/email.services"
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity"
import { LogRepository } from "../../repository/log.repository"

interface SendLogEmailUseCase {
  execute(to: string | string[]): Promise<boolean>
}

export class SendLogEmail implements SendLogEmailUseCase {

  constructor(
    private readonly emailService: EmailService,
    private readonly logRepository: LogRepository
  ) {}

  async execute(to: string | string[]) {
    try {
      const sent = await this.emailService.sendEmailWithFileSystemLogs(to)
      if(!sent) throw new Error('Email not sent')

      const log = new LogEntity({ message: 'Log email send', origin: 'send-email-logs.ts', level: LogSeverityLevel.low })
      this.logRepository.saveLog(log)

      return true
    } catch (error) {

      const log = new LogEntity({ message: `${error}`, origin: 'send-email-logs.ts', level: LogSeverityLevel.high })
      this.logRepository.saveLog(log)

      return false
    }
  }
}