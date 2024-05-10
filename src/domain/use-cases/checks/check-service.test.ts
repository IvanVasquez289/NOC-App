import { LogEntity } from "../../entities/log.entity"
import { CheckService } from "./check-service"

describe("check service use case", () => {

    const MockRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    }

    const successCallback = jest.fn()
    const errorCallback = jest.fn()

    const checkService = new CheckService(
        MockRepository,
        successCallback,
        errorCallback
    )
    
    beforeEach(()=>{
        jest.clearAllMocks()
    })

    test("should return success callback when fetch returns true", async ()=>{
        const wasOk = await checkService.execute('https://google.com')

        expect(wasOk).toBe(true)
        expect(successCallback).toHaveBeenCalled()
        expect(errorCallback).not.toHaveBeenCalled()
        expect(MockRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
    })

    test("should return error callback when fetch returns false", async ()=>{
        const wasOk = await checkService.execute('https://goasdfghjogle.com')
        
        expect(wasOk).toBe(false)
        expect(successCallback).not.toHaveBeenCalled()
        expect(errorCallback).toHaveBeenCalled()
        expect(MockRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
    })
})