//IMPORTS
const express=require('express')
const ejs=require('ejs')
const path=require('path')
const bodyParser = require('body-parser')
const session=require('express-session')
const MongoDBStore=require('connect-mongodb-session')(session)
const flash=require('connect-flash')
const fileUpload=require('express-fileupload')

//INITIATE APP
const app=express()

//MONGOOSE
require('./database/mongoose')

//VIEW ENGINE
const viewsPath=path.join(__dirname,'views')
app.set('view engine','ejs')
app.set('views',viewsPath)

//BODY PARSER
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//SET SESSION
const store=new MongoDBStore({
    uri:'mongodb://localhost/ecommerce',
    collection:'sitesession'
})

app.use(session({
    secret:'TheEcommerceSite',
    resave:false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 30 * 60 //HALF AN HOUR session
    },
    store:store
}))


//SET FLASh
app.use(flash())

//FILE UPLOAD
app.use(fileUpload())

//GLOABL VARIABLE
app.locals.errors=null 

//SET LOCALS
app.use((req,res,next)=>{
    res.locals.isAdmin=req.session.isAdmin
    res.locals.messages=require('express-messages')(req, res)
    next()
})

//CONSTANTS
const publicPath=path.join(__dirname,'public/')
app.use(express.static(publicPath))

//MIDDLEWARE
const auth=require('./controllers/middleware/auth')

//ROUTES
const web=require('./routes/web')
app.use('/',web)

const admin=require('./routes/admin')
app.use('/admin/',auth,admin)

const category=require('./routes/category')
app.use('/admin/categories',auth,category)

const products=require('./routes/product')
app.use('/admin/products',auth,products)

//SERVER CONFIG
const PORT=3000
app.listen(PORT,()=>{
    console.log('App started at port: '+PORT)
})

