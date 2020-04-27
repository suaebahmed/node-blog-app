const mongoose = require('mongoose');
// const Comment = require('./comment-model');
// const User = require('./user-model')

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    author: {
        type: String,
        ref: "User",
    },
    tags:{
        type: [String],
        required: true,
    },
    thumbnail: String,
    readTime: String,
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ],
    dislikes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ],
    //throw an error because there are no comments before
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:  "Comment",
        }
    ]
},{
    timestamps: true
})

module.exports = mongoose.model('Post',blogSchema);