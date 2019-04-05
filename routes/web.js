const route=require('express').Router()
const webController=require('./../controllers/webController')
const {body, validationResult}=require('express-validator/check')
route.get('',webController.getHomePage)
route.get('/login',webController.getLoginPage)

route.post('/login',
    [
         body('email','Invalid email !').isEmail(),
         body('email','Please provide your email adderess').isLength({min:1})
    ],
webController.postLogin)

route.get('/logout',webController.postLogout)
route.post('/create-user',webController.postUser)

module.exports=route