const Chat = require("../../model/chat.model")
const User = require("../../model/users.model")
module.exports.index = async (req, res) => {
    const userID = res.locals.user._id
    const fullname = res.locals.user.email
    _io.once('connection', (socket) => {
        socket.on("CLIENT_SEND_MESS", async (content) => {
            const chat = new Chat({
                user_id: userID,
                content: content
            })
            await chat.save()
            _io.emit("SERVER_RETURN_MESS", {
                user_id: userID,
                content: content,
                fullname: fullname
            })
        })
        socket.on("CLIENT_SEND_TYPING", type => {
            socket.broadcast.emit("SERVER_RETURN_TYPING", {
                user_id: userID,
                type: type,
                fullname: fullname

            })
        })

    });
    const chats = await Chat.find({
        deleted: false
    })
    for (const chat of chats) {
        const infoUser = await User.findOne({
            _id: chat.user_id,
        }).select("email")
        chat.infoUser = infoUser

    }
    res.render("client/pages/chat/index", {
        chats: chats
    })
}