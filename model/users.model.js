const mongoose = require("mongoose")
const { v4: uuidv4 } = require('uuid');
const UsersScheme = new mongoose.Schema({
    _id: { type: String, default: () => uuidv4().replace(/-/g, '') + Date.now() },
    fullname: String,
    password: String,
    email: String,
    phone: Number,
    token: {
        type: String,
        default: () => uuidv4().replace(/-/g, '') + Date.now()
    },
    avatar: {
        type: String,
        default: "https://static.vecteezy.com/system/resources/thumbnails/048/421/274/small/concept-of-no-items-found-no-results-found-user-request-page-not-found-error-notification-404-web-and-mobile-application-symbols-illustration-in-the-background-vector.jpg"
    },
    status: {
        type: String,
        default: "active"
    },
    deleted: {
        type: Boolean,
        default: false,
    },
    deletedAt: Date
}, {
    timestamps: true
});

const Users = mongoose.model('Users', UsersScheme, "users");//(tên tự định nghĩa để tái xử dụng trong js)(tên schma định nghĩa kiểu dữ liệu cho document)(Tên collection trong DB)
module.exports = Users;