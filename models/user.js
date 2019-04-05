const mongoose=require('../database/mongoose')

const userSchema=mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    tokens:[{
        tokens:{
            type:String,
            requireD:true
        }
    }]   
})

const User=mongoose.model('users',userSchema)

module.exports=User

