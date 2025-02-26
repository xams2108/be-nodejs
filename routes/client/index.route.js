const productRoute = require("./product.route")
const homeRoute = require("./home.route")

module.exports = (app) => { //dùng để cho tk khác có thể import xài ở đây cụ thuể là index.js
    app.use("/", homeRoute)
    app.use("/products", productRoute) //sử dụng rote product
    
}