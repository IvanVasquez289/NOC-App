import nodemailer from 'nodemailer'
import { envs } from '../../config/plugins/env.plugins';
import { LogRepository } from '../../domain/repository/log.repository';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

interface  SendEmailOptions {
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachments?: Attachment[]
}

interface Attachment {
    filename: string;
    path: string
}

export class EmailService {

    constructor(
        private readonly logRepository: LogRepository,
    ){}
    
    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user:  envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY
        }
    });

    async sendEmail(options:SendEmailOptions): Promise<Boolean> {
        const {to,subject,htmlBody,attachments = []} = options;
        try {
            const sendInformation = await this.transporter.sendMail({
                to: to,
                subject: subject,
                html: htmlBody,
                attachments: attachments
            })
            console.log(sendInformation)
            
            const log = new LogEntity({
                level: LogSeverityLevel.low,
                message: 'Email sent correctly',
                origin: 'email.service.ts'
            })
            this.logRepository.saveLog(log)

            return true
        } catch (error) {
            
            const log = new LogEntity({
                level: LogSeverityLevel.high,
                message: 'Email was not sent correctly',
                origin: 'email.service.ts'
            })
            this.logRepository.saveLog(log)

            return false
        }
    }

    async sendEmailWithFileSystemLogs(to: string | string[]){
        const subject = 'Logs del servidor'
        const htmlBody = `
            <h3>Logs del sistema - NOC </h3>
            <p>Enviando archivos de logs</p>
            <p>Ver archivos adjuntos</p>
        `
        const attachments: Attachment[] = [
            {filename: 'logs-all.log', path: './logs/logs-all.log'},
            {filename: 'logs-high.log', path: './logs/logs-high.log'},
            {filename: 'logs-medium.log', path: './logs/logs-medium.log'},
        ]

        this.sendEmail({
            to,
            subject,
            htmlBody,
            attachments
        })
    }
}