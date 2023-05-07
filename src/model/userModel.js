const mongoose = require('mongoose')

/**
@params {object} mongoose - the mongoose object
Defines the schema for the User model to store user data in MongoDB database.
@returns {object} - the user model object created from the schema
*/

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    }
}, {timestamps : true})

module.exports = mongoose.model('user', userSchema)