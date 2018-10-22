import {Request, Response, NextFunction, Router} from 'express'
import { Schema, Types } from 'mongoose'

//  import mongodb schema
import Mahasiswa from '../model/Mahasiswa'
import Dosen from '../model/Dosen'
import Tugas from '../model/Tugas'

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
        Mahasiswa.find({}).populate('dosen', 'firstName lastName').populate('tugas')
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

    createTugasMahasiswa(req : Request, res : Response, next : NextFunction)
    {
        const judul : String = req.body.judul
        const keterangan : String = req.body.keterangan
        const id = req.body.id

        const tugas = new Tugas({
            _id : Types.ObjectId(),
            judul,
            keterangan
        })

        tugas.save({})
        .then(data => {
            Mahasiswa.findOneAndUpdate({_id : id}, {tugas : data._id})
            .then(result => {
                const status = res.statusCode
                res.status(200).json({
                    status,
                    data,
                    result
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
        this.router.get('/', this.getMahasiswas)
        this.router.put('/', this.selectDosenOnMahasiswa)
        this.router.put('/createTugas', this.createTugasMahasiswa)
    }
}

const MahasiswaRoutes = new MahasiswaRouter()
MahasiswaRoutes.routes()
export default MahasiswaRoutes.router