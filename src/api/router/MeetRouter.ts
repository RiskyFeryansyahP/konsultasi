import { Request, Response, NextFunction, Router } from 'express'
import { Types } from 'mongoose'

// import modul schema database
import Meet from '../model/Meet'
import Dosen from '../model/Dosen'

class MeetRouter {

    router : Router

    constructor() {
        this.router = Router()
    }

    getMeets(req : Request, res : Response, next : NextFunction)
    {
        // find populate with where clause in mongoose using match code dosen : 484
       // Meet.find({}).populate({path : 'dosen', select : 'firstName lastName', match : { code : 484 } }).populate('mahasiswa', 'firstName lastName college')
       
       Meet.find({}).populate({path : 'dosen', select : 'firstName lastName'}).populate('mahasiswa', 'firstName lastName college')
        .then(data => {
            const status = res.statusCode
            res.status(200).json({
                status,
                data
            })
        })
        .catch(err => {
            const status = res.statusCode
            res.status(500).json({
                status,
                err
            })
        })
    }

    createMeet(req : Request, res : Response, next : NextFunction)
    {

        const jam_awal : String = req.body.jam_awal
        const jam_akhir : String = req.body.jam_akhir
        const keterangan : String = req.body.keterangan
        const dosen  = req.body.dosen
        const mahasiswa = req.body.mahasiswa

        const meet = new Meet({
            _id : Types.ObjectId(),
            jam_awal,
            jam_akhir,
            keterangan,
            dosen,
            mahasiswa
        })

        meet.save({})
        .then(data => {
            Dosen.findOneAndUpdate({_id : dosen}, {meet : meet._id})
            .then(result => {
                const status = res.statusCode
                res.status(200).json({
                    status,
                    result,
                    data
                })
            })
            .catch(err => {
                const status = res.statusCode
                res.status(500).json({
                    status,
                    err
                })
            })
        })
        .catch(err => {
            const status = res.statusCode
            res.status(500).json({
                status,
                err
            })
        })
    }

    routes()
    {
        this.router.get('/', this.getMeets)
        this.router.post('/', this.createMeet)
    }
}

const MeetRoutes = new MeetRouter()
MeetRoutes.routes()
export default MeetRoutes.router