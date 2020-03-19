const router = require('express').Router();
const Post = require('../models/blog-models')

router.get('/',(req,res,next)=>{
    Post.find((err,allpost)=>{
        if(err)
            res.send('err, somthing went wrong.')
        else{
            res.render('index',{allpost})
        }
    })
})

router.get('/post',(req,res)=>{
  res.render('createPost')
})
router.post('/create',(req,res,next)=>{
    console.log(req.body)
    var newPost = new Post({
        title: req.body.title,
        body: req.body.body,
        author: req.body.author
    })
    newPost.save((err)=>{
        if(err){
            res.send('Error')
            res.end()
        }else{
            res.redirect('/')
        }
    })
})

router.get('/post/:id',(req,res,next)=>{
    const id = req.params.id;
    Post.findById(id,(err,post)=>{
        if(err){
            res.send('Error')
        }else{
            res.render('post',{post})
        }    
    })
})

router.delete('/delete/:id',(req,res,next)=>{
    const id = req.params.id;
    Post.deleteOne({_id: id},(err)=>{
        if(err){
            res.send('Error')
            res.end()
        }else{
            res.redirect('/')
        }    
    })
})

router.get('/editPost',(req,res,next)=>{
    res.render('editPost');
})
router.patch('/update/:id',(req,res,next)=>{
    const id = req.params.id;
    console.log(id)
    Post.findOne({_id: id},(err,post)=>{
        if(err){
            res.status(500);
            res.send('Error',err)
            res.end()
        }else{
            console.log(post)
            var newPost = new Post({
                title: req.body.title,
                body: req.body.body,
                author: req.body.author
            })
            post = newPost
            post.save((err)=>{
                if(err){
                    res.status(500);
                    res.send('Error',err)
                    res.end()
                }else{
                    res.redirect('/')
                }
            })       
        }    
    })
})

module.exports = router;