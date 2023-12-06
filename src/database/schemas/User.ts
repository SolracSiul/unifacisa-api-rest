import mongoose from "mongoose";
const User = new mongoose.Schema({
    name:{
        type: String,
        require: true,
    },
    email:{
        type: String,
        required:true,
        unique: true,
        lowercase: true,
    },
    password:{
        type:String,
        required: true,
        select: true,
    },
    profissao:{
        type: String,
        required: false,
        select:true,
    },
    image:{
        type: String,
        required: false,
        select: true
    },
});



export default mongoose.model("User", User);