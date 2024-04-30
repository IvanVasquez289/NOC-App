
export enum LogSeverityLevel {
    low = 'low',
    medium = 'medium',
    high = 'high'
}

interface LogEntityOptions {
    level: LogSeverityLevel,
    message: string,
    createdAt?: Date,
    origin: string,
}

export class LogEntity {
    public level: LogSeverityLevel;
    public message: string;
    public createdAt: Date;
    public origin: string;

    constructor(options: LogEntityOptions){
        const { level, message, origin, createdAt = new Date()} = options;
        this.level = level;
        this.message = message;
        this.origin = origin;
        this.createdAt = createdAt;
    }

    static fromJson = (jsonAsString: string): LogEntity => {
        jsonAsString = (jsonAsString === '')  ? '{}' : jsonAsString;
        const  {level,message,origin,createdAt} = JSON.parse(jsonAsString)
        const log = new  LogEntity({
            level,
            message,
            origin,
            createdAt
        });
        return  log;
    }

    static fromObject = (mongoObject: {[key:string]: any}): LogEntity  =>{
        const {message,level,origin,createdAt} = mongoObject;
        const log = new LogEntity({
            message,
            level,
            origin,
            createdAt
        })

        return log
    }
}