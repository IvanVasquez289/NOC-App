import { envs } from "./env.plugins"

describe("env.plugings", () => {
    test("should return env options",()=>{
        console.log(envs)
        expect(envs).toEqual( {
            PORT: 3000,
            MAILER_SERVICE: 'gmail',
            MAILER_EMAIL: 'ivanker289@gmail.com',
            MAILER_SECRET_KEY: 'pinqnjeoogazojie',
            PROD: true,
            MONGO_URL: 'mongodb://ivan:123456@localhost:27017',
            MONGO_DB_NAME: 'NOC-test',
            MONGO_USER: 'ivan',
            MONGO_PASS: '123456'
          })
    })

    test("should return error if not found env",async()=>{
        jest.resetModules()
        process.env.PORT = 'HOLAMUNDO'

        try {
            const {envs} = await import ('./env.plugins')
            expect(true).toBe(false)
        } catch (error) {
            // console.log(error)
            expect(`${error}`).toContain('"PORT" should be a valid integer')
        }
        
    })
})