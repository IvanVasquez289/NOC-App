import { CheckService } from "../domain/use-cases/checks/check-service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDatasource } from "../infraestructure/datasources/file-system.datasource";
import { LogRepositoryImplementation } from "../infraestructure/repositories/log-repository.impl";
import { CronService } from "./cron/cron-service"
import { EmailService } from "./email/email.service";


const fileSystemLogRepository = new LogRepositoryImplementation( 
    new FileSystemDatasource()
)
export class Server {

    public static start(){
        console.log('Server running...')

        // Mandar email
        // const emailService = new EmailService()

        // new SendEmailLogs(emailService, fileSystemLogRepository).execute(
        //     ['ivanker289@gmail.com','ivanjv1234@gmail.com',]
        // )

        
        // emailService.sendEmailWithFileSystemLogs(
        //     ['ivanker289@gmail.com','ivanjv1234@gmail.com',]
        // )

        // emailService.sendEmail({
        //     to: 'ivanjv1234@gmail.com',
        //     subject: 'Holaaa',
        //     htmlBody: `
        //         <h3>Logs del sistema</h3>
        //         <p>Hola mundo desde  el servidor de logs.</p>
        //         <p>Ver logs...</p>
        //     `
        // })



        // CronService.createJob(
        //     '*/2 * * * * *',
        //     () => {
        //         const date = new Date()
        //         console.log('2 seconds', date);
        //     }
        // ) 
        
        // CronService.createJob(
        //     '*/4 * * * * *',
        //     () => {
        //         const url = 'https://google.com'
        //         new CheckService(
        //             fileSystemLogRepository,
        //             () =>  console.log(` ${url} is up!`),
        //             (error) => console.log(error),
        //         ).execute(url);
        //     }
        // ) 
    }
}