import { Schema, model } from 'mongoose'

//  Membuat Model Schema untuk Dosen
const DosenSchema = new Schema({
    _id :       { type : Schema.Types.ObjectId },
    firstName : { type : String, required : true },
    lastName :  { type : String, required : true },
    code :      {type : Number, required : true},
    mahasiswa : [
        { type : Schema.Types.ObjectId, ref : 'Mahasiswa' }
    ]
})

export default model('Dosen', DosenSchema)