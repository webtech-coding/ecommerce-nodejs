const route=require('express').Router()

//CONTROLLER
const category=require('../controllers/admin/categoryController')

route.get('/categories',[
    
],category.getCategory)

module.exports=route

