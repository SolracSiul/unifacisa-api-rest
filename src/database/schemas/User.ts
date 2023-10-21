import mongoose from "mongoose";
import bcrypt from 'bcryptjs'
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
    }
});
//use bycrypt on mongodb
// User.pre('save', async function (next) {
//     const hashedPassowrd = await bcrypt.hash(this.password, 10);
//     this.password = hashedPassowrd;
//     next();
// })


export default mongoose.model("User", User);