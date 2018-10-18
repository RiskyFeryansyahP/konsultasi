import {Request, Response, NextFunction, Router} from 'express'

//  import mongodb schema
import Mahasiswa from '../model/Mahasiswa'
import User from '../model/User'
import Dosen from '../model/Dosen';

class MahasiswaRouter {
    router : Router
    
    /**
     * Constructor to initiate router
     */

    constructor() {
        this.router = Router()
    }

    /**
     * 
     * @param req Request on Server
     * @param res Response on Server
     * @param next Next function to middleware
     * this function get all mahasiswa data without filter / search
     */

    getMahasiswas(req : Request, res : Response, next : NextFunction)
    {
        Mahasiswa.find({}).populate('dosen', 'firstName lastName')
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
                err
            })
        })
    }

    /**
     * 
     * @param req Request on Server
     * @param res Response on Server
     * @param next NExt Function to middleware
     * this function make update to relation with dosen pembimbing
     */

    selectDosenOnMahasiswa(req : Request, res : Response, next : NextFunction)
    {
        const id = req.body.id
        const dosen = req.body.dosen
        Dosen.findOne({code : dosen})
        .then(data => {
            Mahasiswa.findOneAndUpdate({_id : id}, {dosen : data._id})
            .then(result => {
                const status = res.statusCode
                res.status(200).json({
                    status,
                    data,
                    message : 'Successfully Added Dosen into Mahasiswa'
                })
            })
            .catch(err => {
                res.status(500).json({
                    err
                })
            })
        })
        .catch(err => {
            res.status(500).json({
                err
            })
        })
    }

    routes()
    {
        this.router.get('/', this.getMahasiswas)
        this.router.put('/', this.selectDosenOnMahasiswa)
    }
}

const MahasiswaRoutes = new MahasiswaRouter()
MahasiswaRoutes.routes()
export default MahasiswaRoutes.router