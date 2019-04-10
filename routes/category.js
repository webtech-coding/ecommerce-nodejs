const route=require('express').Router()
const {body, validationResult}=require('express-validator/check')

//CONTROLLER
const category=require('../controllers/admin/categoryController')

route.get('/',category.getCategory)
route.get('/add',category.addCategory)
route.post('/add',[
    body('name','Please provide a category name.').isLength({min:1})
]
,category.postCategory)

route.get('/edit/:slug',category.editCategory)
route.post('/edit/:slug',[
    body('name','Please provide a category name').isLength({min:1})
],category.postEditCategory)

route.get('/delete/:id',category.deleteCategory)

module.exports=route

