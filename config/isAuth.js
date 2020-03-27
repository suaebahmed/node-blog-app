
module.exports = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    
    req.flash('error','the route is protected for see please sign in ')
    res.redirect('/users/login')
}