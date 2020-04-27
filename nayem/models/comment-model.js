const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    body: {
        type: String,
        required: true
    },
    replies: [
        {
            body: {
                type: String,
                required: true
            },
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            createAt: {
                type: Date,
                default: new Date()
            }
        }
    ]
},{
    timestamps: true
})

module.exports = mongoose.model('Comment',commentSchema);