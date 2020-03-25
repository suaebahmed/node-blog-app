const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    postId: {
        type: mongoose.Types.ObjectId
    },
    userName: {
        type: String,
    }
},{
    timestamps: true
})

module.exports = mongoose.model('likes',blogSchema)