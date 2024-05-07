import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface CheckServiceMultipleUseCase {
    execute: (url: string) => Promise<boolean>;
}

type SuccessCallback  = () => void;
type ErrorCallback   = (error: string) => void;

export class CheckServiceMultiple implements  CheckServiceMultipleUseCase {
    constructor(
        private readonly logRepositories: LogRepository[],
        private readonly successCallback: SuccessCallback,
        private readonly  errorCallback: ErrorCallback
    ){}

    private callRepositories(log: LogEntity){
        this.logRepositories.forEach(logRepository => logRepository.saveLog(log))
    }

    public async execute(url: string): Promise<boolean>{
        try {
            const req = await fetch(url)
            if (!req.ok) throw new Error(`Error in check service ${url}`)
                
            const log = new LogEntity({
                level: LogSeverityLevel.low,
                message: `Service ${url} working`, 
                origin: 'check-service.ts'
            })
            this.callRepositories(log)

            this.successCallback()
            return true
        } catch (error) {
            const errorMessage = `${url} is not ok. ${error}`
            const log = new  LogEntity({
                level: LogSeverityLevel.high,
                message: errorMessage ,
                origin: 'check-service.ts'
            })
            this.callRepositories(log)
            this.errorCallback(errorMessage)
            return false
        }
    }
}