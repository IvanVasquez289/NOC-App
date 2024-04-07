import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron-service"

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
                    () =>  console.log(` ${url} is up!`),
                    (error) => console.log(error),
                ).execute(url);
            }
        ) 
    }
}