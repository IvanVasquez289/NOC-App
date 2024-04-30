import { LogSeverityLevel } from "../domain/entities/log.entity";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDatasource } from "../infraestructure/datasources/file-system.datasource";
import { MongoDatasource } from "../infraestructure/datasources/mongo.datasource";
import { LogRepositoryImplementation } from "../infraestructure/repositories/log-repository.impl";
import { CronService } from "./cron/cron-service"
import { EmailService } from "./email/email.service";


const LogRepository = new LogRepositoryImplementation( 
    // new FileSystemDatasource()
    new MongoDatasource()
)
export class Server {

    public static async start(){
        console.log('Server running...')

        // Mandar email
        // const emailService = new EmailService()

        // new SendEmailLogs(emailService, fileSystemLogRepository).execute(
        //     ['ivanker289@gmail.com','ivanjv1234@gmail.com',]
        // )

        // const logs = await LogRepository.getLogs(LogSeverityLevel.high)
        // console.log(logs)

        CronService.createJob(
            '*/4 * * * * *',
            () => {
                const url = 'https://google.com'
                new CheckService(
                    LogRepository,
                    () =>  console.log(` ${url} is up!`),
                    (error) => console.log(error),
                ).execute(url);
            }
        ) 
    }
}