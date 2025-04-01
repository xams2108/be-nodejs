const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');

const ChatSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: () => uuidv4().replace(/-/g, '') + Date.now()
    },
    user_id: {
        type: String,
        required: true // Thêm validation nếu cần
    },
    room_id: {
        type: String,
        required: false // Tùy chọn nếu chat không cần room
    },
    content: { // Sửa typo từ "contendt" thành "content"
        type: String,
        required: true
    },
    images: {
        type: [String], // Chỉ rõ Array chứa String (URL hình ảnh)
        default: []
    },
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: { // Chuẩn hóa tên thành "deletedAt" (camelCase)
        type: Date
    }
}, {
    timestamps: true // Tự động thêm createdAt, updatedAt
});

const Chat = mongoose.model('Chat', ChatSchema, "chats"); // Đổi 'Chats' thành 'Chat' cho nhất quán
module.exports = Chat;