const localStategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/User-model')


module.exports = function(){
    passport.use( new localStategy(function(username,password,done){
        User.findOne({email: username},(err,user)=>{
            if(err){
                return done(null,err);
            }
            else if(!user){
                return done(null,false,{message: 'incorrect username'})
            }
            else{
                bcrypt.compare(password,user.password,(err,isMatch)=>{
                    if(err){
                        return done(null,err);
                    }
                    else if(!isMatch){
                        return done(null,false,{message: 'incorrect password'})
                    }else{
                        return done(null,user)
                    }       
                })
            }
        })
    }))
    passport.serializeUser(function(User,done){
        done(null,User.id);
    })
    passport.deserializeUser((id,done)=>{
        User.findById(id,(err,User)=>{
            done(err,User);
        })
    })
}