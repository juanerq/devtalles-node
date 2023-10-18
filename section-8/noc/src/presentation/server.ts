import { CronService } from "./cron/cron-service";
import { CheckService } from "../domain/use-cases/checks/check-service";

export class ServerApp {
  static start() {
    console.log('Server started...');
    
    const url = 'https://google.com'

    CronService.createJob('*/5 * * * * *', () => {
      new CheckService(
        () => console.log(url, 'success'),
        (error) => console.log(error)
      ).execute(url)
    })
  }
}