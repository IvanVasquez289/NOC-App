import { CronService } from "./cron/cron-service"

export class Server {

    public static start(){
        console.log('Server running...')

        CronService.createJob(
            '*/2 * * * * *',
            () => {
                const date = new Date()
                console.log('2 seconds', date);
            }
        ) 
        CronService.createJob(
            '*/4 * * * * *',
            () => {
                const date = new Date()
                console.log('4 seconds', date);
            }
        ) 
        CronService.createJob(
            '*/6 * * * * *',
            () => {
                const date = new Date()
                console.log('6 seconds', date);
            }
        ) 
    }
}