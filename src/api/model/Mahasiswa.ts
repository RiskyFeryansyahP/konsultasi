import { model, Schema } from 'mongoose'

//  Membuat Model Schema untuk Mahasiswa
const MahasiswaSchema = new Schema({
    _id :       { type : Schema.Types.ObjectId },
    firstName : { type : String, required : true },
    lastName :  { type : String, required : true },
    college :   { type : String, required : true },
    dosen :     { type : Schema.Types.ObjectId, ref : 'Dosen'},
    tugas :     { type : Schema.Types.ObjectId, ref : 'Tugas' }
})

// MahasiswaSchema.virtual('dosen1', {
//     ref : 'Dosen',
//     localField: 'dosen', 
//     foreignField: 'code' ,
//     justOne : true
// })

export default model("Mahasiswa", MahasiswaSchema)