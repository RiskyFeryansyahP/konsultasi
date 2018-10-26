import * as mongoose from 'mongoose';

// membuat interface schema untuk Tugas
export interface ITugas extends mongoose.Document {
    _id : mongoose.Types.ObjectId,
    judul : string,
    keterangan : string,
    bab1 : string,
    bab2 : string,
    bab3 : string,
    bab4 : string,
    bab5 : string
}

// membuat model schema untuk Tugas
const TugasSchema : mongoose.Schema = new mongoose.Schema({
    _id : { type : mongoose.Schema.Types.ObjectId },
    judul : { type : String, required : true },
    keterangan : { type : String, required : true },
    bab1 : { type : String, default : '' },
    bab2 : { type : String, default : '' },
    bab3 : { type : String, default : '' },
    bab4 : { type : String, default : '' },
    bab5 : { type : String, default : '' },
})

export default mongoose.model<ITugas>('Tugas', TugasSchema);