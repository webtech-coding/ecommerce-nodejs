const route=require('express').Router()
route.get('',(req,res)=>{
    res.render('web/index')
})
module.exports=route