
module.exports = function(req,res,next){
    //_____________ session menagement method 2_______________
    // if(req.session.isAuthenticated){
    //     return next();
    // }
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('error','the route is protected for see please sign in ')
    res.redirect('/users/login')
}