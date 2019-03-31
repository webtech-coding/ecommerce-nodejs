const mongoose=require('mongoose')

mongoose.connect('mongodb://localhost/ecommerce',
{
   useNewUrlParser:true 
})

module.exports=mongoose