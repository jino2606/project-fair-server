/* import mongoose */
const mongoose = require('mongoose')

/* import validator */
const validator = require('validator')

/* create schema */ /* need to use schema class in mongoose */
const userSchema = new mongoose.Schema({
    username:{
        type: String,
        require: true,
        min: [3, 'Must be at least 3, got {VALUE}']
    },
    email:{
        type:String,
        require: true,
        unique: true,
        validator(value){
            if(!validator.isEmail(value)){
                throw new Error('Invalid Email')
            }
        }
    },
    password:{
        type:String,
        require: true
    },
    github:{
        type:String
    },
    linkedin:{
        type:String
    },
    profile:{
        type:String
    }
})

/* create modal */
const users = mongoose.model("users", userSchema)

/* export the model */
module.exports = users