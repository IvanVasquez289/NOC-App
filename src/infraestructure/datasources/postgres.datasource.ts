import { PrismaClient, SeverityLevel } from "@prisma/client";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";


const SeverityEnum = {
    low: SeverityLevel.LOW,
    medium: SeverityLevel.MEDIUM,
    high: SeverityLevel.HIGH
}

export class PostgresDatasource extends LogDatasource {
    async saveLog(log: LogEntity): Promise<void> {
        const prisma = new PrismaClient()
        const level = SeverityEnum[log.level]
        const newLog = await prisma.logModel.create({
            data:{
                message: log.message,
                origin: log.origin,
                level: level
            }
        })
    }
    async getLogs(level: LogSeverityLevel): Promise<LogEntity[]> {
        const prisma = new PrismaClient()
        const logs = await prisma.logModel.findMany({
            where:{
                level: SeverityEnum[level]
            }
        })

        return logs.map(log => LogEntity.fromObject(log))
        
    }

}