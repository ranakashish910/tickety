const isLoggedIn=(req,res,next)=>{
    if(!req.session.user){
        return res.redirect('/auth/login')
    }
    try{
        return next();
    }catch(err){
        return res.redirect('/auth/login',{error:"Server error"})
        console.log(err);
    }
}
const isAdmin=(req,res,next)=>{
    if(req.session.user.role==='admin'){
        next();
    }else{
        return res.status(403).send("Unauthorized")
    }
}
module.exports={isLoggedIn,isAdmin}