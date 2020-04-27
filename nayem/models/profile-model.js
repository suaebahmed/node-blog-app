const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title:{
        type: String,
        trim: true,
        maxlength: 100
    },
    bio: {
        type: String,
        trim: true,
        maxlength: 500
    },
    skills: {
        type: Array
    },
    profilePic: {
        type: String,
    },
    links: {
        website: String,
        facebook: String,
        twitter: String,
        github: String,
    },
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }
    ],
    bookmarks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }
    ]
},{timestamps: true});

module.exports = mongoose.model('Profile',profileSchema);