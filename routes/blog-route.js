const router = require('express').Router();
const Post = require('../models/blog-models')

router.get('/',(req,res,next)=>{  // render index page with all post
    Post.find((err,allpost)=>{
        if(err)
            res.send('err, somthing went wrong.')
        else{
            res.render('index',{allpost})
        }
    })
})

router.get('/post',(req,res)=>{   // render createPost page
  res.render('createPost')
})
router.post('/create',(req,res,next)=>{
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

router.get('/post/:id',(req,res,next)=>{ // render indevisual page
    const id = req.params.id;
    Post.findById(id,(err,post)=>{
        if(err){
            res.send('Error')
        }else{
            res.render('post',{post})
        }    
    })
})

router.get('/delete/:id',(req,res,next)=>{
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

router.get('/editPost/:id',(req,res,next)=>{ // render editPost page
    const id = req.params.id;
    Post.findById(id,(err,post)=>{
        if(err){
            res.type('html')
            res.status(500);
            res.send('Error',err)
            res.end()
        }else{
            res.render('editPost',{post})
        }    
    })
})
router.post('/update/:id',(req,res,next)=>{ // must have post method
    const id = req.params.id;
    Post.findOne({_id: id},(err,post)=>{
        if(err){
            res.type('html')
            res.status(500);
            res.send('Error',err)
            res.end()
        }else{
            var newPost ={
                title: req.body.title,
                body: req.body.body,
                author: req.body.author
            }

            post.title = newPost.title;
            post.body = newPost.body;
            post.author = newPost.author;
            // console.log(newPost)

// ----------------- they create new Post---------------
            // var s = new Post({ 
            //     title: req.body.title,
            //     body: req.body.body,
            //     author: req.body.author                
            // })
            // s.save((err)=>{

            post.save((err)=>{
                if(err){
                    res.type('html')
                    res.status(500);        
                    res.send('Error')
                    res.end()
                    }
                else{
                    res.redirect('/')
                }
            })       
        }    
    })
})

module.exports = router;