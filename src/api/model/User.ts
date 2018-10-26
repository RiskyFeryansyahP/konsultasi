import * as mongoose from 'mongoose'

// membuat interface model for user
export interface IUser extends mongoose.Document {
    _id : mongoose.Types.ObjectId,
    username : string,
    password : string,
    email : string,
    status : mongoose.Types.ObjectId,
    onStatus : string
}

//  Membuat Model Schema untuk User
const UserSchema = new mongoose.Schema({
    _id : { type : mongoose.Schema.Types.ObjectId },
    username : { type : String, required : true, unique : true },
    password : { type : String, required : true },
    email :     { type : String, required : true},
    status : { type : mongoose.Schema.Types.ObjectId, required : true, refPath: 'onStatus' },
    onStatus : { type : String, required : true, enum : ['Mahasiswa', 'Dosen'] }
})

export default mongoose.model<IUser>("User", UserSchema)