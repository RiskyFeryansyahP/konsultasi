import * as mongoose from 'mongoose'

// Membuat interface schema untuk Meet
export interface IMeet extends mongoose.Document {
    _id : mongoose.Types.ObjectId,
    jam_awal : string,
    jam_akhir : string,
    keterangan : string,
    status : string,
    dosen : mongoose.Types.ObjectId,
    mahasiswa : mongoose.Types.ObjectId
}

// membuat model schema untuk Meet
const MeetSchema = new mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    jam_awal : { type : String },
    jam_akhir : { type : String },
    keterangan : { type : String },
    status : { type : String, default : 'progress' },
    dosen : { type : mongoose.Schema.Types.ObjectId, ref : 'Dosen' },
    mahasiswa : { type : mongoose.Schema.Types.ObjectId, ref : 'Mahasiswa' }
})

export default mongoose.model<IMeet>('Meet', MeetSchema)