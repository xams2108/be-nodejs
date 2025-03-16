const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');
const roleScheme = new mongoose.Schema({
    _id: { type: String, default: () => uuidv4().replace(/-/g, '') + Date.now() },
    title: String,
    permissions: {
        type: Array,
        default: []
    },
    deleted: {
        type: Boolean,
        default: false
    },
    description: String,
    deletedAt: Date
}, {
    timestamps: true
});

const Roles = mongoose.model('Roles', roleScheme, "roles");//(tên tự định nghĩa để tái xử dụng trong js)(tên schma định nghĩa kiểu dữ liệu cho document)(Tên collection trong DB)
module.exports = Roles;