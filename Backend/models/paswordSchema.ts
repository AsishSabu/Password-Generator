import mongoose from "mongoose"
const passWordSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },     
},{timestamps:{updatedAt:false}})

export default mongoose.model("Password",passWordSchema)
