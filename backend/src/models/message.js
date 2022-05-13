const mongoose = require("mongoose")

const MessageSchema = new mongoose.Schema({

    message: {
        type: String,
        required: true
    },
    user: {
        userId: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
    },
    time: {
        type: Date,
        default: Date.now
    },

}, {
    collection: "Messages"
})

const model = mongoose.model("MessageSchema", MessageSchema)

module.exports = model;