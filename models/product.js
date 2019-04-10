const mongoose=require('../database/mongoose')

const productSchemas=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    slug:{
        type:String,
        require:true
    },
    category:{
        type:String,
        required:true
    },
    description:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        required:true
    },
    stock:{
        type:Number,
        required:true
    },
    image:{
        type:String
    }
})

const Products=mongoose.model('products',productSchemas)
module.exports=Products