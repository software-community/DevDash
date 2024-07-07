const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: String,
    entryNumber: String,
    date: String,
    time: Number
});

module.exports = mongoose.model("users", userSchema)