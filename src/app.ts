import { envs } from './config/plugins/env.plugins';
import { LogModel, MongoDataBase } from './data/mongo';
import { Server } from "./presentation/server"

(async()=>{
    main()
})()

async function main (){
    await MongoDataBase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME
    })

    // Crear una coleccion = tabla , documento = registro
    // const newLog = await LogModel.create({
    //     message: 'Desde  el servidor de inicio 4',
    //     level: 'low',
    //     origin: 'desde app.ts'
    // })

    // await newLog.save()
    // console.log(newLog)

    const logs = await LogModel.find().where('level').equals('low')
    console.log(logs)
    // Server.start()
}