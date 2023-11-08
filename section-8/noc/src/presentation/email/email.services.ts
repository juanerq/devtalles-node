import { envs } from '../../config/plugins/envs.plugin'
import nodemailer from 'nodemailer'

interface Attachment {
  filename: string
  path: string
}

interface SendMailOptions {
  to: string | string[]
  subject: string
  htmlBody: string
  attachments?: Attachment[]
}

export class EmailService {
  private transporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY,
    }
  })

  constructor() {}

  async sendEmail(options: SendMailOptions): Promise<boolean> {
    const { to, subject, htmlBody, attachments = [] } = options

    try {
      const sendInformation = await this.transporter.sendMail({
        to, subject, html: htmlBody, attachments
      })

      return true
    } catch (error) {
      console.log(error);
      
      return false
    }
  }

  async sendEmailWithFileSystemLogs(to: string | string[]) {
    const subject = 'Logs server'
    const htmlBody = `
      <h1>Logs server</h1>
    `

    const attachments: Attachment[]  = [
      { filename: 'logs-all.log', path: 'logs/logs-all.log' },
      { filename: 'logs-high.log', path: 'logs/logs-high.log' },
      { filename: 'logs-medium.log', path: 'logs/logs-medium.log' }
    ]

    return this.sendEmail({ to, subject, htmlBody, attachments })
  }
}