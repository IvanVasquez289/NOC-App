import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDatasource } from "../infraestructure/datasources/file-system.datasource";
import { LogRepositoryImplementation } from "../infraestructure/repositories/log-repository.impl";
import { CronService } from "./cron/cron-service"


const fileSystemLogRepository = new LogRepositoryImplementation( 
    new FileSystemDatasource()
)
export class Server {

    public static start(){
        console.log('Server running...')

        // CronService.createJob(
        //     '*/2 * * * * *',
        //     () => {
        //         const date = new Date()
        //         console.log('2 seconds', date);
        //     }
        // ) 
        
        CronService.createJob(
            '*/4 * * * * *',
            () => {
                const url = 'https://google.com'
                new CheckService(
                    fileSystemLogRepository,
                    () =>  console.log(` ${url} is up!`),
                    (error) => console.log(error),
                ).execute(url);
            }
        ) 
    }
}