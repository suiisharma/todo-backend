import mongoose from "mongoose";

const  TaskScema=mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
    },
    isCompleted:{
     type:Boolean,
     default:false
    },
    userId:{
     type:mongoose.Schema.Types.ObjectId,
     ref:"User",
     required:true,
     select:false
    },
    Created_at:{
        type:Date,
        default:Date.now
    },
    Deadline:{
        type:Date,
        default:new Date(Date.now()+(24*60*60*1000))
    }
})



const Task=mongoose.model('Task',TaskScema);


export default Task