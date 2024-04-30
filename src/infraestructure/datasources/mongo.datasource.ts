import { LogModel } from "../../data/mongo";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

export class MongoDatasource implements LogDatasource {
    async saveLog(log: LogEntity): Promise<void> {
        const newLog = await LogModel.create(log)
        console.log('Mongo Log created')
    }
    async getLogs(level: LogSeverityLevel): Promise<LogEntity[]> {
        // const logs = await LogModel.find().where('level').equals(LogSeverityLevel)
        const logs = await LogModel.find({
            level: LogSeverityLevel
        })
        return logs.map(mongoLog => LogEntity.fromObject(mongoLog));
    }
    
}