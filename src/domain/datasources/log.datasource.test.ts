import { LogEntity, LogSeverityLevel } from "../entities/log.entity";
import { LogDatasource } from "./log.datasource";

describe("log.datasource.ts",()=>{

    const newLog = new LogEntity({
        level: LogSeverityLevel.low,
        message: 'Desde test',
        origin: 'hola'
    })

    class MockLogDatasource implements LogDatasource {
        async saveLog(log: LogEntity): Promise<void> {
            return
        }
        async getLogs(level: LogSeverityLevel): Promise<LogEntity[]> {
            return [newLog]
        }

    }

    test("should test the abstract class",async()=>{
        const mockLogDatasource = new MockLogDatasource()
        expect(mockLogDatasource).toBeInstanceOf(MockLogDatasource)
        expect(typeof mockLogDatasource.getLogs).toBe('function')
        expect(typeof mockLogDatasource.saveLog).toBe('function')

        await mockLogDatasource.saveLog(newLog)
        const logs = await mockLogDatasource.getLogs(LogSeverityLevel.high)
        expect(logs).toHaveLength(1);
        expect(logs[0]).toBeInstanceOf(LogEntity)
        // console.log(typeof mockLogDatasource.getLogs)
    })
})