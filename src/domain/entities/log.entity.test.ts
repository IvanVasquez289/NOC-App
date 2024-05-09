import { LogEntity, LogSeverityLevel } from "./log.entity"

describe("log.entity.ts", ()=> {
    
    const logData = {
        message: 'Hola mundo',
        level: LogSeverityLevel.low,
        origin: 'log.entity.test.ts'
    }

    test("should create an instance of LogEntity",()=>{

        const log = new LogEntity(logData)

        expect(log).toBeInstanceOf(LogEntity)
        expect(log.message).toBe(logData.message)
        expect(log.level).toBe(logData.level)
        expect(log.origin).toBe(logData.origin)
        expect(log.createdAt).toBeInstanceOf(Date)
    })

    test("should create a LogEntity instance from json",()=>{
        const jsonString = '{"level":"low","message":"Service https://google.com working","origin":"check-service.ts","createdAt":"2024-05-08T01:29:40.710Z"}'
        const log = LogEntity.fromJson(jsonString)

        expect(log).toBeInstanceOf(LogEntity)
        expect(log.message).toBe("Service https://google.com working")
        expect(log.level).toBe(LogSeverityLevel.low)
        expect(log.origin).toBe("check-service.ts")
        expect(log.createdAt).toBeInstanceOf(Date)
    })

    test("should create a LogEntity instance from json",()=>{
        const log = LogEntity.fromObject(logData)
        expect(log).toBeInstanceOf(LogEntity)
        expect(log.message).toBe(logData.message)
        expect(log.level).toBe(logData.level)
        expect(log.origin).toBe(logData.origin)
        expect(log.createdAt).toBeInstanceOf(Date)
        // console.log(log)
    })
})