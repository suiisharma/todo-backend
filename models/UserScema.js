import mongoose from "mongoose";

const userScema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        select:false
    },
    Created_at:{
        type:Date,
        default:Date.now
    }
})

const User=mongoose.model('User',userScema);


export default User