const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        unique: true
    },
    signature: {
        type: String,
        required: false,
        default: "I'm the greatest person alive!"
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        default: 0
    }

}, {
    collection: "Users"
})

const model = mongoose.model("UserSchema", UserSchema)

module.exports = model;