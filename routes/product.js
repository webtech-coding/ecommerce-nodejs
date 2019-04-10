const route=require('express').Router()
const productsController=require('../controllers/admin/productController')

const {body}=require('express-validator/check')

route.get('/', productsController.getProducts)
route.get('/add',productsController.addProduct)
route.post('/add',[
    body('name','Please provide product\'s name').isLength({min:1}),
    body('price','Please provide price').isFloat(),
    body('stock','please provide the stock amount').isNumeric(),
    body('description','Please provide the description').isLength({min:1}),
   
],productsController.postProduct)

module.exports=route