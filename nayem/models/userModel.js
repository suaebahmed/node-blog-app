const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        maxlength: 30
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile'
    }
})

module.exports = mongoose.model('User',userSchema);