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
                const service = new CheckService().execute('https://www.google.com');
            }
        ) 
    }
}