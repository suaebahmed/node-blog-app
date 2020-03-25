const router = require('express').Router();
const passport = require('passport')
const User = require('../models/User-model');
const bcrypt = require('bcryptjs')

router.get('/login',(req,res)=>{ // turn off login page
    res.render('users/signin')
})
router.post('/signin',(req,res,next)=>{
    const {email,password}= req.body;
    if(email == '' || password == ''){
        req.flash('error','make sure email and password not empty!')
        res.render('users/signin');
    }
    else{
        passport.authenticate('local',{
            successRedirect: '/',
            failureRedirect: '/users/login',
            failureFlash: true,
            successFlash: 'Welcome!'
        })(req,res,next)
    }
})

router.get('/logout',(req,res,next)=>{
    req.logout();
    req.flash('success','you successfully logout')
    res.redirect('/users/login')
})

router.get('/register',(req,res,next)=>{ // turn off register page
    res.render('users/signup')
})

router.post('/signup',(req,res)=>{
    const {userName,email,password} = req.body;
    var errArr=[]
    if( !userName || !password  || !email){
        errArr.push({msg: 'fill up all the field'})
    }
    if(password.length < 5){
        errArr.push({msg: 'password should be at least 6 character'})
    }
    if(errArr.length > 0){
        res.render('users/signup',{signupValidErr: errArr})
    }else{
        User.findOne({email: email},(err,user)=>{
            if(err){
                res.status(500).json({
                    msg: "mongoose err",
                    err: err
                })
            }
            else if(user){
                errArr.push({msg: 'user already exists'})
                res.render('users/signup',{signupValidErr: errArr})
            }else{
            bcrypt.genSalt(10,(err,selt)=>{
                bcrypt.hash(password,selt,(err,hash)=>{
                    var newUser = new User({
                        userName,
                        email,
                        password
                    });
                    newUser.password = hash
                        newUser.save()
                        .then(()=>{
                            req.flash('success','You successfully signup now you can signin')
                            res.redirect('/users/login')
                        })
                        .catch(err=>{
                            res.status(500).json({
                                Error: err
                            })
                        })
                    })
                })
            }
        })
    }
})

module.exports = router;