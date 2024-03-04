const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please add a name']
    },
    email:{
        type:String,
        required:[true,'Please add a email'],
        unique: true
    },
    password:{
        type:String,
        required:[true,'Please add a password'],
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default:false

    }
}, { timestamps: true})
//timestamps is an optional param which is used to add time of creation of data

// model name is User and schema is userschema
module.exports = mongoose.model('User',userSchema)