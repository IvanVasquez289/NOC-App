import mongoose from "mongoose"
import { MongoDataBase } from "./init"

describe("init.ts",()=>{

    afterAll(()=>{
        mongoose.connection.close()
    })

    test("should connnect to mongodb",async ()=>{
        const connected = await MongoDataBase.connect({
            dbName: process.env.MONGO_DB_NAME!,
            mongoUrl: process.env.MONGO_URL!
        })
        expect(connected).toBe(true)
    })  

    test("should return an error",async ()=>{

        try {
            const connected = await MongoDataBase.connect({
                dbName: 'nombreFake',
                mongoUrl: 'mongodb://ivan:holamundo@localhost:27017'
            })
            expect(true).toBe(false)
        } catch (error) {
            expect(`${error}`).toContain("MongooseError: Can't call `openUri()` on an active connection with different connection strings")
        }
    })  
    
})