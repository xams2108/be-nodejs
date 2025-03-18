const AutheMiddleWare = require("../../middlewares/auth.middleware")
const systemConfig = require("../../config/system")
const dashboadroute = require("./dashboard.route")
const productroute = require("./products.route")
const productCategoryroute = require("./productsCategory.route")
const roleroute = require("./roles.route")
const accountroute = require("./account.route")
const loginroute = require("./auth.route")

module.exports = (app) => { //dùng để cho tk khác có thể import xài ở đây cụ thuể là index.js
    const pathadmin = systemConfig.PathAdmin
    app.use("/" + pathadmin + "/dashboard", AutheMiddleWare.checktoken, dashboadroute)
    app.use("/" + pathadmin + "/products", AutheMiddleWare.checktoken, productroute)
    app.use("/" + pathadmin + "/products-category", AutheMiddleWare.checktoken, productCategoryroute)
    app.use("/" + pathadmin + "/roles", AutheMiddleWare.checktoken, roleroute)
    app.use("/" + pathadmin + "/account", AutheMiddleWare.checktoken, accountroute)
    app.use("/" + pathadmin + "/auth", loginroute)
}