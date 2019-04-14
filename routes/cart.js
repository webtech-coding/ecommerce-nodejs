const route=require('express').Router()


const cartController=require('../controllers/cartController')
route.get('/checkout',cartController.checkout)
route.get('/update/:id',cartController.update)
route.get('/clear',cartController.clearCart)
route.get('/:id',cartController.addToCart)


module.exports=route