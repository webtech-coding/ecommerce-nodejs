//IMPORTS
const express=require('express')
const ejs=require('ejs')
const path=require('path')

//INITIATE APP
const app=express()

//MONGOOSE
require('./database/mongoose')

//VIEW ENGINE
const viewsPath=path.join(__dirname,'views')
app.set('view engine','ejs')
app.set('views',viewsPath)

//CONSTANTS
const publicPath=path.join(__dirname,'public/')
app.use(express.static(publicPath))

//ROUTES
const web=require('./routes/web')
app.use('/',web)

//SERVER CONFIG
const PORT=3000
app.listen(PORT,()=>{
    console.log('App started at port: '+PORT)
})

