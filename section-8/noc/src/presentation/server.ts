import { CronService } from "./cron/cron-service";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasources";
import { EmailService } from "./email/email.services";
import { SendLogEmail } from "../domain/use-cases/email/send-email-logs";

const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDatasource
)
const emailService = new EmailService()

export class ServerApp {
  static start() {
    console.log('Server started...');
    
    const url = 'https://googlesdfsd.com'

    new SendLogEmail(
      emailService, 
      fileSystemLogRepository
    ).execute('jrjuanreyes64@gmail.com')

    //CronService.createJob('*/5 * * * * *', () => {
     /*  new CheckService(
        fileSystemLogRepository,
        () => console.log(url, 'success'),
        (error) => console.log(error)
      ).execute(url)
    }) */
  }
}