const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: String,
    entryNumber: String,
    date: String,
    time: Number,
    isEnd: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model("users", userSchema)