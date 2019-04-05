const route=require('express').Router()

route.get('/',(req,res)=>{
   res.render('admin/index')
})

route.post('/logout',async (req,res)=>{
   try{
        await req.session.destroy()
        res.redirect('/')
    }catch(error){
        console.log(error)
    }
   
})

module.exports=route