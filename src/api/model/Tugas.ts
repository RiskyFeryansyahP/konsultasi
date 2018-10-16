import { model, Schema } from 'mongoose';

const TugasSchema = new Schema({
    _id : { type : Schema.Types.ObjectId },
    judul : { type : String, required : true },
    keterangan : { type : String, required : true },
    bab1 : { type : String },
    bab2 : { type : String },
    bab3 : { type : String },
    bab4 : { type : String },
    bab5 : { type : String },
})

export default model('Tugas', TugasSchema);