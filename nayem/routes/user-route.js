const router = require('express').Router();
const passport = require('passport')
const User = require('../models/userModel')
const Profile = require('../models/profile-model')
const bcrypt = require('bcryptjs')
const multer = require('multer')
const isAuth = require('../config/isAuth')
const fs = require('fs');

router.get('/login',(req,res)=>{ // turn off login page
    res.render('users/signin')
})
router.post('/signin',(req,res,next)=>{
    const {username,password}= req.body;
    if(username == '' || password == ''){
        req.flash('error','make sure email and password not empty!')
        res.render('users/signin');
    }
    else{
        // res.setHeader('Set-Cookie','isLoggedWithCookie=true')
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
    const {name,email,password} = req.body;
    var errArr=[]
    if( !name || !password  || !email){
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
                        name,
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
//  ----------- user profile -----

router.get('/profile',isAuth,(req,res,next)=>{
    res.render('users/profile')
})

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,`./public/uploads`)
    },
    filename: function(req,file,cb){
        cb(null,file.originalname)
    }
})
const upload = multer({
    storage
})
// no work
router.post('/upload',upload.single('image'),(req,res,next)=>{
    Profile.findOne({email: req.user.email},(err,user)=>{
        if(err){
           return res.send('Error to upload a file')
        }else{
            
            const bio = req.body.bio
            if(req.file){
                const fileName = req.file.originalname
                user.imgPath = `/uploads/${fileName}`
            }
            if(bio && bio !== ''){
                user.bio = bio;
            }
    
            user.save(err=>{
                if(err){
                    return res.send('Error to upload a file')
                 }else{
                     res.redirect('/users/profile')
                 }
            })
        }
    })
})

router.get('/delete',(req,res,next)=>{
    try{
    fs.unlinkSync(`./public${req.user.imgPath}`)
      return  res.redirect('/users/profile')
    }catch(err){
        res.status(500).json({msg: 'error to delete file',err: err})
    }
})

module.exports = router;