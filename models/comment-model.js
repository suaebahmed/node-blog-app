const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    body: {
        type: String,
        required: true
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    userName: {
        type: String,
    },
    userImg: {
        type: String,
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Comment',commentSchema)