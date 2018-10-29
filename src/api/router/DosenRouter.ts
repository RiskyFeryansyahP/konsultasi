import { Router, Request, Response, NextFunction } from 'express'

// Import Model Schema Database
import Dosen from '../model/Dosen'
import Meet from '../model/Meet'

class DosenRouter {
    router : Router
    constructor() {
        this.router = Router()
    }

    getDosens(req : Request, res : Response, next : NextFunction)
    {
        Dosen.find({}).populate({path : 'meet', select : 'status jam_awal jam_akhir keterangan mahasiswa', 
                       populate : { path : 'mahasiswa', select : 'firstName lastName' } })
                       .populate('mahasiswa', 'firstName lastName college')
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

    acceptMeet(req : Request, res : Response, next : NextFunction)
    {
        const jawaban : String = req.body.jawaban
        const id = req.body.id
        if(jawaban == 'Accept')
        {
            Meet.findOneAndUpdate({_id : id}, {status : 'diterima'})
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
        else 
        {
            Meet.findOneAndUpdate({_id : id}, {status : 'ditolak'})
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
    }

    routes()
    {
        this.router.get('/', this.getDosens)
        this.router.post('/accept', this.acceptMeet)
    }
}

const DosenRoutes = new DosenRouter()
DosenRoutes.routes()
export default DosenRoutes.router