import { model, Schema } from 'mongoose';

const TugasSchema = new Schema({
    _id : { type : Schema.Types.ObjectId },
    judul : { type : String, required : true },
    keterangan : { type : String, required : true },
    bab1 : { type : String, default : '' },
    bab2 : { type : String, default : '' },
    bab3 : { type : String, default : '' },
    bab4 : { type : String, default : '' },
    bab5 : { type : String, default : '' },
})

export default model('Tugas', TugasSchema);