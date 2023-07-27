import mongoose from 'mongoose'

const ProfileSchema= mongoose.Schema({
    Path:{
        type: String,
        required: true,
        default: ""
    },
    name:{
        type:String,
        required: true,
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        unique:true,
        required: true,
    }
})
const Profile=mongoose.model("profile",ProfileSchema)

 export default Profile