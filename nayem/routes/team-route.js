const router = require('express').Router();
const User = require('../models/User-model');
const isAuth = require('../config/isAuth')
const Post = require('../models/blog-models');

router.get('/teams',(req,res,next)=>{
    User.find()
        .then(teams=>{
            res.render('teams',{teams})
        })
        .catch(err=>{
            res.send('Error in team-routes')
        })
})
router.get('/teams/:id',(req,res,next)=>{
    let id = req.params.id;
    let allPost;
    Post.find({authorId: id})
        .then(post=>{
            allPost = post;
            return User.findById(id)
        })
        .then(author=>{
            res.render('posts/authorPost',{allPost,author})
        })
        .catch(err=>{
            res.send('Error in team-routes')
        })
})


module.exports = router;