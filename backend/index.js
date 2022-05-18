// Express server initialization
const express = require('express');
const app = express();
const path = require("path")

const server = app.listen(3000, () => {
    console.log("listening on *:3000");
});

// Database
const mongoose = require("mongoose")

mongoose.connect('mongodb://localhost:27017/chat-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// Authentication routes
const authRouter = require("./src/authentication/authRouter")
app.use("/authentication", authRouter)

// // Chat routes
// const chatRouter = require("./src/chat/chatRouter");
// app.use("/", chatRouter)

// Displaying the page
app.use(express.static("dist"))

// Socket IO initialization
const io = require("socket.io")(server);
const socketConfig = require("./src/chat/chatConfig.js")(io)


