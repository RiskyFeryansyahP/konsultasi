import { Request, Response, NextFunction, Router } from 'express'
import * as mongoose from 'mongoose'

// imported model mongoodb
import Tugas from '../model/Tugas'
import User from '../model/User'

class TugasRouter {
    
    router : Router

    constructor() {
        this.router = Router()
    }

    getTugas(req : Request, res : Response, next : NextFunction)
    {
        Tugas.find({})
        .populate('mahasiswa', 'firstName lastName college')
        .then(data => {
            const status = res.statusCode
            res.status(200).json({
                status,
                data
            })
        })
        .catch(err => {
            res.status(500).json({
                err
            })
        })
    }

    getTugasSpecification(req :Request, res : Response, next : NextFunction)
    {

        User.findOne({username : req.params.username})
        .then(data => {
            const id = data.status
            Tugas.findOne({mahasiswa : id})
            .then(result => {
                const status = res.statusCode
                res.status(200).json({
                    status,
                    result
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

    progressTugas(req : Request, res : Response, next : NextFunction)
    {
        const id  = req.params.id
        Tugas.findOneAndUpdate({_id : id}, req.body)
        .then(data => {
            const status = res.statusCode
            res.status(200).json({
                status,
                data
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
        this.router.get('/', this.getTugas)
        this.router.put('/:id', this.progressTugas)
        this.router.get('/:username', this.getTugasSpecification)
    }
}

const TugasRoutes = new TugasRouter()
TugasRoutes.routes()
export default TugasRoutes.router 