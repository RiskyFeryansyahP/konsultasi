import { Router, Request, Response, NextFunction } from 'express'
import * as mongoose from 'mongoose'
import * as bcrypt from 'bcrypt'

// import Model
import User from '../model/User'
import Mahasiswa from '../model/Mahasiswa'

//  Membuat class User Router untuk mengatur Route User
class UserRouter {

    router : Router

    constructor() {
        this.router = Router()
    }

    /**
     * 
     * @param req : Request from node
     * @param res  : Response from node
     * @param next : nextFunction from node
     * this function will make get All Users in mongodb
     */
    getUsers(req : Request, res : Response, next : NextFunction)
    {
        User.find({}).populate('status')
        .then(data => {
            const status = res.statusCode
            res.status(200).json({
                status,
                data
            })
        })
        .catch(err => {
            const status = res.statusCode
            res.status(status).json({
                status,
                err
            })
        })
    }

    /**
     * 
     * @param req 
     * @param res 
     * @param next
     * this function will be get one user with what a username what you want to search 
     */

    getUser(req : Request, res : Response, next : NextFunction)
    {
        const username = req.params.username
        User.find({username}).populate('status')
        .then(data => {
            const status = res.statusCode
            res.status(200).json({
                status,
                data
            })
        })
        .catch(err => {
            const status = res.statusCode
            res.status(status).json({
                status,
                err
            })
        })
    }

    /**
     * this function make a new User and  New Mahasiswa to get the relation with User
     * in this function you can see that me make 2 save data User and Mahasiswa
     * after Save User first will be save mahasiswa in 2nd process
     * @param req 
     * @param res 
     * @param next 
     */

    createNewUser(req : Request, res : Response, next : NextFunction)
    {
        const username : String = req.body.username
        const password : String = bcrypt.hashSync(req.body.password, 10)
        const onStatus : String = req.body.onStatus
        const firstName : String = req.body.firstName
        const lastName : String = req.body.lastName
        const email : any = req.body.email
        const college : String = req.body.college
        const id = mongoose.Types.ObjectId()


        const user = new User({
            _id : mongoose.Types.ObjectId(),
            username,
            password,
            email,
            status : id,
            onStatus
        })

        const mahasiswa = new Mahasiswa({
            _id : id,
            firstName,
            lastName,
            college
        })

        user.save({})
        .then(data => {
            mahasiswa.save({})
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
                res.status(status).json({
                    status,
                    err
                })
            })
        })
        .catch(err => {
            const status = res.statusCode
            res.status(status).json({
                status,
                err
            })
        })
    }

    /**
     * this function just make a Update password on user
     * 
     * @param req 
     * @param res 
     * @param next 
     */

    updateUser(req : Request, res : Response, next : NextFunction)
    {
        const username : String = req.params.username
        User.findOneAndUpdate({username}, { password : bcrypt.hashSync(req.body.password, 10) })
        .then(result => {
            const status = res.statusCode
            res.status(200).json({
                status,
                result
            })
        })
        .catch(err => {
            const status = res.statusCode
            res.status(status).json({
                status,
                err
            })
        })
    }

    /**
     * in this function will make a deleted user and mahasiswa too
     * you can see at the first i will be find one user what i want deleted and then 
     * in there i will be deleted user at first process, after i deleted the users this will be deleted the mahasiswa
     * on id = id profile
     * @param req 
     * @param res 
     * @param next 
     */

    deleteUser(req : Request, res : Response, next : NextFunction)
    {
        const username : String = req.params.username
        // first, we findOne username what we want delete and get the id status from profile to delete profile
        User.findOne({username})
        .then(data => {
            const id = data.status
            // then in here we deleted the user
            User.deleteOne({username})
            .then(result => {
                // in here we deleted the mahasiswa
                Mahasiswa.deleteOne({_id : id})
                .then(results => {
                    const status : Number = res.statusCode
                    res.status(200).json({
                        status,
                        result,
                        results
                    })
                })
                .catch(err => {
                    const status = res.statusCode
                    res.status(status).json({
                        status,
                        err
                    })
                })

            })
            .catch(err => {
                const status = res.statusCode
                res.status(status).json({
                    status,
                    err
                })
            })

        })
    }

    routes()
    {
        this.router.get('/', this.getUsers)
        this.router.get('/:username', this.getUser)
        this.router.post('/', this.createNewUser)
        this.router.put('/:username', this.updateUser)
        this.router.delete('/:username', this.deleteUser)
    }

}

const UserRoute = new UserRouter()
UserRoute.routes()
export default UserRoute.router