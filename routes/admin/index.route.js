const systemConfig = require("../../config/system")
const dashboadroute = require("./dashboard.route")
module.exports = (app) => { //dùng để cho tk khác có thể import xài ở đây cụ thuể là index.js
    const pathadmin = systemConfig.PathAdmin
    app.use("/"+pathadmin+"/dashboard", dashboadroute)

    
}