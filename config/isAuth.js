
module.exports = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    
    req.flash('error','to make a comment plase sign in')
    res.redirect('/users/login')
}