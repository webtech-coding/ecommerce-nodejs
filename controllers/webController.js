const bcrypt=require('bcryptjs')
const {validationResult}=require('express-validator/check')
const User=require('../models/user')
const Product=require('../models/product')
const Category=require('../models/category')

getHomePage=async (req,res)=>{
    const categories=await Category.find()
    const products=await Product.find()
    res.render('web/index',{
        categories,
        products
    })
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

getProduct=async (req,res)=>{
    const id=req.params.id

    const product=await Product.findById(id)
    res.render('web/product',{
        product
    })
}

getProductCategory=async (req,res)=>{

    const category=req.params.category
    const products=await Product.find({category})
    const categories=await Category.find()
    
    res.render('web/product_category',{products,categories})
}

module.exports={getHomePage,getLoginPage, postLogin,postLogout,postUser,getProduct,getProductCategory}