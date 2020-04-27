const mongoose = require('mongoose')

// unique: true // if we set the key we get a warning!
const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
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
})

module.exports = mongoose.model('User',userSchema)