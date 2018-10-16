//  Import Depedency
import * as express from 'express'
import * as mongoose from 'mongoose'
import * as bodyParser from 'body-parser'
import * as morgan from 'morgan'
import * as cors from 'cors'

// Import Router
import User from './api/router/UserRouter'

class Server {
    // membuat variabel app untuk menampung sebuah data dari express
    public app : express.Application

    constructor() {
        this.app = express()
        this.config()
        this.routes()
    }

    config()
    {
        const MONGO_URI = ""
        mongoose.set('useCreateIndex', true)
        mongoose.connect(MONGO_URI || process.env.MONGODB_URI, { useNewUrlParser : true })
        this.app.use(bodyParser.urlencoded({ extended : true }))
        this.app.use(bodyParser.json())
        this.app.use(morgan('dev'))
        this.app.use(cors())
    }

    routes()
    {
        this.app.use('/api/v1/user/', User)
    }
}

export default new Server().app