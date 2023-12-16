import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    firstname:{
        type: String,
        default: null
    },
    lastname:{
        type: String,
        default: null
    },
    email:{
        type: String,
        unique: true,
    },
    password: {
        type: String,
        
    },
    token:{
        type: String,
    }
},{timestamps:true});

export const User = mongoose.model('User',userSchema);