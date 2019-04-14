const Product=require('../models/product')

const addToCart=async (req,res)=>{
    const id=req.params.id

    try{
        const product=await Product.findById(id)

        if(typeof(req.session.cart) =='undefined'){

            req.session.cart=[]

            req.session.cart.push({
                name:product.name,
                id:product._id,
                quantity:1,
                price:product.price,
                image:product.image
            })

        }else{
            const carts=req.session.cart
            let newItem=true

            carts.forEach(cart => {
                if(cart.id==id){
                    cart.quantity++
                    newItem=false
                    
                }
            })

            if(newItem){
                carts.push({
                    name:product.name,
                    id:product._id,
                    quantity:1,
                    price:product.price,
                    image:product.image
                })
            }
        }

    }catch(error){
        console.log(error)
    }

    req.flash('success','Product added successfully')

    return res.redirect('/product/'+id)
        
}

const checkout=(req,res)=>{
    console.log(req.session.cart)
    const carts=req.session.cart
    res.render('web/cart',{carts})
    
}

const update=async (req,res)=>{
    const id=req.params.id
    let action=req.query.action

    action=action.replace('\'','').replace('\'','')
    console.log(action)
   
    const carts=req.session.cart

    carts.forEach((cart,index)=>{

        if(cart.id==id){
            
            switch(action){
                case "add":
                    cart.quantity=cart.quantity+1
                break
                case "remove":
                    if(cart.quantity>=2){
                        cart.quantity=cart.quantity-1
                    }
                break
                case "clear":
                    carts.splice(index,1)
                break
            }
        }
    })

    if(carts.length==0){
        delete req.session.cart
    }

    res.redirect('back')
}

const clearCart=(req,res)=>{
    delete req.session.cart

    res.redirect('back')
}

module.exports={addToCart,checkout,update,clearCart}