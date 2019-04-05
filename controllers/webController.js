const bcrypt=require('bcryptjs')
const {validationResult}=require('express-validator/check')
const User=require('../models/user')

getHomePage=(req,res)=>{
    res.render('web/index')
}

getLoginPage=(req,res)=>{
    res.render('web/login',{
        email:''
    })
}

postLogin=async (req,res)=>{

    const email=req.body.email
    const errors=validationResult(req)

    if(!errors.isEmpty()){
        return res.render('web/login',{
            email,
            errors:errors.array()
        })
    }
    
    try{
        const user=await User.findOne({email})

        if(!user){
            req.flash('error','Authentication failure !')

            return res.render('web/login', {
                email
            })
        }

        const isAuth=await bcrypt.compare(req.body.password,user.password)
        if(!isAuth){
            req.flash('error','Authentication failed !')
            return res.render('web/login',{
              email,              
            })
        }

        req.session.isAdmin=true
        res.redirect('/admin')

    }catch(error){
        return res.send(error)
    }
}

postLogout=async (req,res)=>{
    try{
        await req.session.destroy()
        res.redirect('/login')
    }catch(error){
        console.log(error)
    }

}

postUser=async (req,res)=>{
   const email=req.body.email
   try{
        const password=await bcrypt.hash(req.body.password,8) 
        const user=new User({email,password})
        await user.save()
        res.send(user)

    }catch(error){
        res.send(error)
    }

   
}

module.exports={getHomePage,getLoginPage, postLogin,postLogout,postUser}