const mongoose = require('mongoose')

/* create a schema from mongoose */
const projectSchema = new mongoose.Schema({
    title:{
        type:String,
        require: true,
    },
    language:{
        type:String,
        require:true
    },
    github:{
        type:String,
        require:true
    },
    website:{
        type:String,
        require:true
    },
    overview:{
        type:String,
        require:true
    },
    projectImage:{
        type:String,
        require:true
    },
    userId:{
        type:String,
        require:true
    }
})

/* create a model from mongoose */
const projects = mongoose.model("projects", projectSchema)

module.exports = projects