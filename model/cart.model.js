    const mongoose = require("mongoose");
    const slug = require("mongoose-slug-updater")
    const { v4: uuidv4 } = require('uuid');
    const CartScheme = new mongoose.Schema({
        _id: { type: String, default: () => uuidv4().replace(/-/g, '') + Date.now() },
        userInfo: {
            address: String,
            fullname: String,
            Phone: Number,
        },
        products: Array,
        deletedAt: Date
    }, {
        timestamps: true
    });

    const ProductsCategory = mongoose.model('Carts', CartScheme, "carts");//(tên tự định nghĩa để tái xử dụng trong js)(tên schma định nghĩa kiểu dữ liệu cho document)(Tên collection trong DB)
    module.exports = ProductsCategory;