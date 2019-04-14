const Product=require('../../models/product')
const Category=require('../../models/category')
const {validationResult}=require('express-validator/check')
const path=require('path')
const fs=require('fs')

const getProducts=async (req,res)=>{

    const products= await Product.find()

    res.render('admin/product',{
        count:products.length,
        products
    })    
}

const addProduct=async (req,res)=>{
    const categories=await Category.find()
    res.render('admin/product_add',{
        categories
    })
}

const postProduct=async (req,res)=>{
    
    const hasImage=(req.files)?true:false
    
    const errors=validationResult(req)
       
    try{
       const categories=await Category.find()

       if(!errors.isEmpty()){
            return res.render('admin/product_add',{
                errors:errors.array(),
                categories
            })
        }

        if(!hasImage){
            req.flash('error','Please provide an image for the product')
            return res.render('admin/product_add',{
                error:errors.array(),
                categories
            })
        }

        const fileExtension=path.extname(req.files.images.name).toLowerCase()
        const isImage=(/\.(gif|jpg|jpeg|tiff|png)$/i).test(fileExtension)

        if(!isImage){
            req.flash('error','Please provide a valid image for the product')
            return res.render('admin/product_add',{
                error:errors.array(),
                categories
            })
        }

        const slug=req.body.name.replace(/\s+/g,'-').toLowerCase()

        let product=await new Product({
            name:req.body.name,
            price:req.body.price,
            stock:req.body.stock,
            category:req.body.category,
            slug:slug,
            description:req.body.description
        })

        await product.save()

        const image=req.files.images
        const imagePath=product._id+'_'+image.name

        image.mv('public/storage/'+imagePath)

        product.image=imagePath
        product.save()

        req.flash('success','product has been saved successfully')

        return res.redirect('/admin/products')
        

    }catch(error){
        console.log(error)
    }
}

const deleteProduct=async (req,res)=>{
    const id=req.params.id

    try{
        const product=await Product.findOne({_id:id})
        const image='public/storage/'+product.image


        await Product.findByIdAndRemove(id)
        fs.unlink(image,(error)=>{
            console.log(error)
            req.flash('success','The product has been deleted successfully.')
            res.redirect('/admin/products')
        })
       
    }catch(error){
        console.log(error)
    }
}

module.exports={getProducts,addProduct,postProduct,deleteProduct}