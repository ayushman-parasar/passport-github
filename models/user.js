var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var userSchema = new Schema({
    email:{
        type:String,
        required: true,
    },
    name:{
        type:String,

    },
    provider:[{
        type:String,
        required:true,
    }],
    github: {
        git_id:{
            type: String,
        },
        name:{
            type:String,

        },
       
    },
    google: {
        displayName:{
            type:String,
        },
        google_id:{
            type: String,
        }
    }
})

module.exports = mongoose.model('User', userSchema)