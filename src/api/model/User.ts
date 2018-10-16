import { Schema, model } from 'mongoose'

//  Membuat Model Schema untuk User
const UserSchema = new Schema({
    _id : { type : Schema.Types.ObjectId },
    username : { type : String, required : true, unique : true },
    password : { type : String, required : true },
    email :     { type : String, required : true, unique : true },
    status : { type : Schema.Types.ObjectId, required : true, refPath: 'onStatus' },
    onStatus : { type : String, required : true, enum : ['Mahasiswa', 'Dosen'] }
})

export default model("User", UserSchema)