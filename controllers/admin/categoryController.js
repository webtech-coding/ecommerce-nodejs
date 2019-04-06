const Category=require('../../models/category')
const {validationResult}=require('express-validator/check')

const getCategory=async (req,res)=>{
    const categories=await Category.find()
    const count=categories.length

    res.render('admin/category',{
        categories,count
    })
}

const addCategory=(req,res)=>{
    res.render('admin/category_add')
}

const postCategory=async (req,res)=>{

    const errors=validationResult(req)

    if(!errors.isEmpty()){
        return res.render('admin/category_add',{
            errors:errors.array()
        })
    }

    const name=req.body.name.trim()
    const slug=name.replace(/\s+/g, '-').toLowerCase(); 

   try{
        let category=await Category.findOne({slug})

        console.log(category)

        if(category){
            req.flash('error','The category name already exist')
            return res.render('admin/category_add');
        }

        category=await new Category({name,slug})
        await category.save()

        req.flash('success','A new category has been created')
        res.redirect('/admin/categories')
   }catch(error){
        console.log(error)
   }
   
}

const editCategory=async (req,res)=>{
    const slug=req.params.slug

    const category=await Category.findOne({slug})

    res.render('admin/category_edit',{
        slug,category
    })
}

const postEditCategory=async (req,res)=>{
    const errors=validationResult(req)

    const id=req.body.id
    const slug=req.params.slug

    try{
        let category=await Category.findOne({_id:id})
    
        if(!errors.isEmpty()){

            return res.render('admin/category_edit',{
                category,slug,errors:errors.array()
            })
        }

        const name=req.body.name
        const slug_new=name.replace(/\s+/g, '-').toLowerCase()

        await Category.findOneAndUpdate({_id:id},{name,slug:slug_new})
        req.flash('success','Updated successfully')
        res.redirect('/admin/categories')

    }catch(error){
        console.log(error)
    }

}


module.exports={getCategory,addCategory,postCategory,editCategory,postEditCategory}