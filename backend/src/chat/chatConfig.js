exports = module.exports = function (io) {

    const Message = require("../models/message")
    const User = require("../models/user")

    // Setting up the connection to socket IO
    io.on("connection", (socket) => {

        // initialize newly joined user
        socket.on("initialization", async () => {

            // Get user details from the database
            const users = await User.find({}).sort([["status", -1]]).select("username signature status");

            try {

                const list = await Message.find({})

                io.emit("updateUserList", users)
                io.emit("updateMessageboard", list)

            } catch (error) {
                console.log(error)
            }

        })

        // send message
        socket.on("sendMessage", async (message) => {

            try {
                const neMessage = await Message.create({
                    message: message.message,
                    user: {
                        userId: message.user.id,
                        username: message.user.username
                    }

                })

                io.emit("updateMessage", neMessage);

            } catch (error) {
                console.log(error)
            }
        })


        socket.on("userDisconnect", async () => {
            console.log("Disconnected")

            /// Get user details from the database
            const users = await User.find({}).sort([["status", -1]]).select("username signature status");;

            io.emit("updateUserList", users);

        })


    });

}