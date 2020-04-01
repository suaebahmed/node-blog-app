
module.exports = function(req,res,next){

    if(req.session.isAuthenticated){
        // console.log(req.isAuthenticated) // function
        return next();
    }
    req.flash('error','the route is protected for see please sign in ')
    res.redirect('/users/login')
}