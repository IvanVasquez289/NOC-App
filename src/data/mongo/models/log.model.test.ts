import mongoose from "mongoose"
import { MongoDataBase } from "../init"
import { LogModel } from "./log.model"

describe("log.model.ts",()=>{

    beforeAll(async()=>{
        await MongoDataBase.connect({
            dbName: process.env.MONGO_DB_NAME!,
            mongoUrl: process.env.MONGO_URL!
        })
    })

    afterAll(()=>{
        mongoose.connection.close()
    })

    test('should return LogModel',async()=>{
        const logData = {
            message: 'Desde test',
            level: 'low',
            origin: 'desde log.model.test.ts'
        }

        const log = await LogModel.create(logData)

        expect(log).toEqual(expect.objectContaining({
            ...logData,
            createdAt: expect.any(Date),
            id: expect.any(String),
        }))

        await LogModel.findByIdAndDelete(log.id)
    })

    test('should return the schema object',()=>{
        const schema = LogModel.schema.obj
        // console.log(schema)
        expect(schema).toEqual(expect.objectContaining(
            {
                message: { type: expect.any(Function), required: true },
                origin: { type: expect.any(Function)},
                level: {
                  type: expect.any(Function),
                  enum: [ 'low', 'medium', 'high' ],
                  default: 'low'
                },
                createdAt: expect.any(Object),
            }
        ))
    })
})