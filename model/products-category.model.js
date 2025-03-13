const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater")
const { v4: uuidv4 } = require('uuid');
mongoose.plugin(slug);
const productCategoryScheme = new mongoose.Schema({
    _id: { type: String, default: () => uuidv4().replace(/-/g, '') + Date.now() },
    parent_id: {
        type: String,
        default: "",
    },
    title: String,
    description: String,
    thumbnail: {
        type: String,
        default: "https://static.vecteezy.com/system/resources/thumbnails/048/421/274/small/concept-of-no-items-found-no-results-found-user-request-page-not-found-error-notification-404-web-and-mobile-application-symbols-illustration-in-the-background-vector.jpg"
    },
    status: String,
    position: Number,
    deleted: {
        type: Boolean,
        default: false,
    },
    slug: {
        type: String,
        slug: "title", //lấy giá trị title của sản phẩm để hiển thị trên url
        unique: true
    },
    deletedAt: Date
}, {
    timestamps: true
});

const ProductsCategory = mongoose.model('ProductsCategory', productCategoryScheme, "products-category");//(tên tự định nghĩa để tái xử dụng trong js)(tên schma định nghĩa kiểu dữ liệu cho document)(Tên collection trong DB)
module.exports = ProductsCategory;