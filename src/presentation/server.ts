import { CronJob } from "cron"

export class Server {

    public static start(){
        console.log('Server running...')

        const job = new CronJob(
            '*/2 * * * * *', // cronTime
            () => {
                const date = new Date()
                console.log('2 seconds', date);
            }
        );
        job.start()
    }
}