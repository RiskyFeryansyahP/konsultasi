import { Schema, model, Document } from 'mongoose'

// membuat interface schema untuk Dosen
export interface IDosen extends Document {
    _id : Schema.Types.ObjectId,
    firstName : string,
    lastName : string,
    code : number,
    meet : Schema.Types.ObjectId,
    mahasiswa : Schema.Types.ObjectId
}

//  Membuat Model Schema untuk Dosen
const DosenSchema = new Schema({
    _id :       { type : Schema.Types.ObjectId },
    firstName : { type : String, required : true },
    lastName :  { type : String, required : true },
    code :      {type : Number, required : true},
    meet : [
        { type : Schema.Types.ObjectId, ref : 'Meet'}
    ],
    mahasiswa : [
        { type : Schema.Types.ObjectId, ref : 'Mahasiswa' }
    ]
})

export default model<IDosen>('Dosen', DosenSchema)