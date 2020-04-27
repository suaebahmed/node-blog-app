const Post = require('../../../models/blog-models');
const Comment = require('../../models/comment-model');

exports.commentOnPost = async (req,res,next)=>{
    let postId = req.params.postId;

    if(!req.user){
        return res.status(403).json({
            error: "you are not an Auth"
        })
    }
    let newComment = new Comment({
        post: postId,
        user: req.user._id,
        body: req.body.body,
        replies: []
    });

    try {
        let createdComment = await newComment.save();
        await Post.findOneAndUpdate(
            {_id: postId},
            {$push: {'comments': createdComment._id}}
        )
        
        let commentJSON = await Comment.findById(createdComment._id).populate({
            path: 'user',
            select: 'profilePics username'
        });
        return res.status(201).json(commentJSON)

    } catch (e) {
        console.log(e)
        return res.status(500).json({
            error: "Server Error"
        })
    }
}