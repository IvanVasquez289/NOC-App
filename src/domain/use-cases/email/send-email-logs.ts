import { EmailService } from "../../../presentation/email/email.service"
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from '../../repository/log.repository';

interface SendEmailLogsUseCase {
    execute: (to: string | string[])=> Promise<boolean>
}

export class SendEmailLogs implements  SendEmailLogsUseCase{

    constructor(
        private emailService : EmailService,
        private LogRepository : LogRepository
    ){}
    async execute(to: string | string[]):  Promise<boolean>{
        try {
            const sent = await this.emailService.sendEmailWithFileSystemLogs(to)

            if(!sent){
                throw new Error('Email log not sent')
            }

            const log = new LogEntity({
                level: LogSeverityLevel.low,
                message: 'Email sent correctly',
                origin: 'send-email-logs.ts'
            })
            this.LogRepository.saveLog(log)

            return true
        } catch (error) {
            
            const log = new LogEntity({
                level: LogSeverityLevel.high,
                message: `${error}`,
                origin: 'send-email-logs.ts'
            })
            this.LogRepository.saveLog(log)

            return false
        }
        
    }
   
}