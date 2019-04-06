const mongoose=require('../database/mongoose')

const categorySchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    slug:{
        type:String,
        required:true
    }
})

const Category=mongoose.model('categories',categorySchema)

module.exports=Category