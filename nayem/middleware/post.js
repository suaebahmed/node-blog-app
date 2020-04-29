const mongoose = require('mongoose')
const Post = require('../models/post-model');
const User = require('../models/userModel');
const Comment = require('../models/comment-model')

exports.createApost = (req,res,next)=>{
    
    const {tags} = req.body
    var arr = tags.split(',')
    var newTagsArr = arr.map(ar=>{
        return ar.trim();
    })

    var newPost = new Post({
        title: req.body.title,
        body: req.body.body,
        tags: newTagsArr,
        author: req.user._id,
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
        let postData = { post: '',commentCount: null}
        let userId;
        Post.findById(id)
        .then(doc=>{
            postData.post = doc
            postData.commentCount = doc.comments.length;
            userId = doc.authorId

            return User.findById(userId)
        })
        .then((author)=>{
            return res.render('posts/post',{postData,author})
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
    let { body } = req.body;
    let newComment = {
        body: body,
        userName: req.user.userName,
        userImg: req.user.imgPath
    }
    Post.updateOne(
        {_id: id},
        {$push:{
            comments: newComment 
            }
        })
        .then(()=>{
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