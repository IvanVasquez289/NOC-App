import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogRepository } from "../../domain/repository/log.repository";
import { LogDatasource } from '../../domain/datasources/log.datasource';

export class LogRepositoryImplementation implements LogRepository {

    
    constructor(
        private logDataSource:LogDatasource
    ){}

    async saveLog(log: LogEntity): Promise<void> {
        this.logDataSource.saveLog(log);
    }
    async getLogs(level: LogSeverityLevel): Promise<LogEntity[]> {
        return this.logDataSource.getLogs(level)
    }

}