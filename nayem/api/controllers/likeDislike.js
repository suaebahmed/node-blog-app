const Post = require('../../../models/blog-models');
const Comment = require('../../models/comment-model');

exports.likeOnPost = async (req,res,next)=>{
    let {postId } = req.params
    let liked = null;

    if(!req.user){
        return res.status(403).json({
            error: 'Unauthorization'
        });
    }
    let userId = req.user._id;

    try {
        
        let post = await Post.findById(postId)
        if(post.likes.includes(userId)){
            await Post.findByIdAndUpdate(
                {_id: postId},
                {$pull: {
                    dislikes: userId
                }}
            )
        }
        if(post.dislikes.includes(userId)){
            await Post.findByIdAndUpdate(
                {_id: postId},
                {$pull: {
                    likes: userId
                }}
            )
        }else{
            await Post.findByIdAndUpdate(
                {_id: postId},
                {$push: {
                    likes: userId
                }}
            )
            liked = true;
        }
        let updatePost = await Post.findById(postId);
        res.status(200).json({
            liked,
            totalLikes : updatePost.likes.length,
            dislikes: updatePost.dislikes.length,
        });

    } catch (error) {
        console.log(e)
        return res.status(500).json({
            error: "Server Error"
        })
    }
}

exports.unlikeOnPost = async (req,res,next)=>{
    let {postId } = req.params
    let disliked = null;

    if(!req.user){
        return res.status(403).json({
            error: 'Unauthorization'
        });
    }
    let userId = req.user._id;

    try {
        
        let post = await Post.findById(postId)
        if(post.likes.includes(userId)){
            await Post.findByIdAndUpdate(
                {_id: postId},
                {$pull: {
                    likes: userId
                }}
            )
        }
        if(post.dislikes.includes(userId)){
            await Post.findByIdAndUpdate(
                {_id: postId},
                {$pull: {
                    dislikes: userId
                }}
            )
            disliked = false;
        }else{
            await Post.findByIdAndUpdate(
                {_id: postId},
                {$push: {
                    dislikes: userId
                }}
            )
            disliked = true;
        }

        let updatePost = await Post.findById(postId);
        res.status(200).json({
            liked,
            totalLikes : updatePost.likes.length,
            dislikes: updatePost.dislikes.length,
        });

    } catch (error) {
        console.log(e)
        return res.status(500).json({
            error: "Server Error"
        })
    }
}

