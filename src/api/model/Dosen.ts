import { Schema, model } from 'mongoose'

//  Membuat Model Schema untuk Dosen
const DosenSchema = new Schema({
    _id :       { type : Schema.Types.ObjectId },
    firstName : { type : String, required : true },
    lastName :  { type : String, required : true },
    email :     { type : String, required : true, unique : true },
    code :      {type : String, required : true},
    mahasiswa : [
        { type : Schema.Types.ObjectId, ref : 'Mahasiswa' }
    ]
})

export default model('Dosen', DosenSchema)