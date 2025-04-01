const productRoute = require("./product.route")
const homeRoute = require("./home.route")
const cartRoute = require("./cart.route")
const userRoute = require("./user.route")
const chatRoute = require("./chat.route")
const CartMiddleware = require("../../middlewares/cart.middleware")
const userMiddleware = require("../../middlewares/authUser.middleware")
module.exports = (app) => {
    // Middleware áp dụng cho tất cả routes
    app.use(CartMiddleware.check);
    app.use(userMiddleware.checkUser); // ← Áp dụng cho mọi route

    // Các routes
    app.use("/user", userRoute); // Route đăng nhập/đăng ký (public)
    app.use("/products", productRoute); // Đã được bảo vệ bởi middleware tổng
    app.use("/cart", cartRoute); // Đã được bảo vệ
    app.use("/chat", chatRoute )
    app.use("/", homeRoute); // Route chính
};