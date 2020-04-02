const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    body: {
        type: String,
        required: true
    },
    userName: {
        type: String,
    },
    userImg: {
        type: String,
    }
})

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
        required: true
    },
    comments: [commentSchema]  // --Embedded
},{
    timestamps: true
})

module.exports = mongoose.model('Post',blogSchema)