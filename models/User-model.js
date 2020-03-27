const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        // unique: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    bio: {
        type: String,
    },
    skills: {
        type: Array
    },
    imgPath: {
        type: String,
    }
},{
    timestamps: true
})

module.exports = mongoose.model('User',userSchema)