const mongoose = require('mongoose')
const Comment = require('../models/comment-model');
const Post = require('../models/blog-models');

exports.createApost = (req,res,next)=>{
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
}

exports.getAPostWithComment = (req,res,next)=>{
    const id = req.params.id;
    let postData = { post: '',commentCount: null ,comments: ''}

    Post.findById(id)
        .then(doc=>{
            postData.post = doc
            return Comment.find({postId: id}).exec()
        })
        .then(arr=>{
            postData.comments =  arr;
            postData.commentCount = arr.length;
            return res.render('posts/post',{postData})
        })
        .catch(err=>{
           return res.status(500).json('error')
        })
}

exports.getAllPost = (req,res,next)=>{ 
    Post.find((err,allpost)=>{
        if(err)
            res.send('err, somthing went wrong.')
        else{
            res.render('posts/index',{allpost})
        }
    })
}

exports.makeAComment = (req,res,next)=>{


    let id = req.params.id    
    let { body,name } = req.body;
    var newComment = new Comment({
        _id: new mongoose.Types.ObjectId(),
        body: body,
        userName: req.session.user.userName,
        postId: id
    })
    Post.findById(id)
        .then(doc=>{
            if(!doc){
                return res.status(200).json({'msg': 'the post is empty so that you cannot make a commment'})
            }else{
                return newComment.save();
            }
        })
        .then(data=>{
            return res.redirect(`/posts/${id}`)
        })
        .catch(err=>{
            return res.status(500).json({'error': err})
        })
}

exports.deleteAPost = (req,res,next)=>{
    const id = req.params.id;
    Comment.deleteMany({postId: id})
           .then(()=>{
               return Post.deleteOne({_id: id})
           })
           .then(()=>{
               return res.redirect('/')
           })
           .catch(err=>{
                return  res.send('Error')
           })
}

exports.editPostPage = (req,res,next)=>{ 
    const id = req.params.id;
    Post.findById(id,(err,post)=>{
        if(err){
            res.type('html')
            res.status(500);
            res.send('Error',err)
            res.end()
        }else{
            res.render('posts/editPost',{post})
        }    
    })
}
exports.updatePost = (req,res,next)=>{ // must have post method
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
}