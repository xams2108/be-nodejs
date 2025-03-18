const flash = require("express-flash")

module.exports.check = (req, res, next) => {
    if (!req.body.email) {
        req.flash("error", "Vui lòng nhập email")
        res.redirect("back")
        return
    } else if (!req.body.password) {
        req.flash("error", "Vui lòng nhập mật khẩu")
        res.redirect("back")
        return
    }
    next()
}