import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

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
    createdAt:{
        type: Date,
        default: Date.now
    }
});
User.pre('save', async function name(next) {
        const hashedPassword = await bcrypt.hash(this.password, 12);
        this.password = hashedPassword;
        next();
})

export default mongoose.model("User", User);