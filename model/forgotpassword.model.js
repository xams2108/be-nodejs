const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');

const forgotpasswordsScheme = new mongoose.Schema({
    _id: { type: String, default: () => uuidv4().replace(/-/g, '') + Date.now() },
    email: String,
    Otp: String,
    expiredAt: {
        type: Date,
        expires: 180,
    }

}, {
    timestamps: true
});

const Forgotpasswords = mongoose.model('Forgotpasswords', forgotpasswordsScheme, "forgotpasswords");//(tên tự định nghĩa để tái xử dụng trong js)(tên schma định nghĩa kiểu dữ liệu cho document)(Tên collection trong DB)
module.exports = Forgotpasswords;