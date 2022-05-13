exports = module.exports = function (io) {

    const Message = require("../models/message")

    const activeUsers = new Map();

    io.on("connection", (socket) => {

        // initialize newly joined user
        socket.on("initialization", async (user) => {

            if (!activeUsers.has(user.id)) {
                activeUsers.set(user.id, user.username);
            }

            try {

                const list = await Message.find({})

                const users = Array.from(activeUsers, ([id, username]) => ({
                    id,
                    username
                }));

                io.emit("updateUserList", users)
                io.emit("updateMessageboard", list)

            } catch (error) {

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


        socket.on("userDisconnect", (userId) => {
            console.log("Disconnected")

            activeUsers.delete(userId);

            const users = Array.from(activeUsers, ([id, username]) => ({
                id,
                username
            }));

            io.emit("updateUserList", users);

        })


    });

}