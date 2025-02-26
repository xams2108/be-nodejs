const mongoose = require("mongoose");
const productScheme = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    discountPercentage: Number,
    stock: Number, 
    thumbnail: String,
    status: String, 
    position: Number,
    deleted: Boolean
});

const  Products = mongoose.model('Products',productScheme,"products");//(tên tự định nghĩa để tái xử dụng trong js)(tên schma định nghĩa kiểu dữ liệu cho document)(Tên collection trong DB)
module.exports = Products;