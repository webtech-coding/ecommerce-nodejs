const auth=(req,res,next)=>{
    if(!req.session.isAdmin){
        return res.redirect('/')
    }
    next()
}

module.exports=auth