const flash = require("express-flash")
module.exports.checkregister = async (req, res, next) => {
    if (!req.body.email) {
        flash("error", "Vui lòng nhập email")
        res.redirect("back")
        return
    } else if (!req.body.password) {
        flash("error", "Vui lòng nhập mật khẩu")
        res.redirect("back")
        return
    } else if (!req.body.confirmPassword) {
        flash("error", "Vui lòng nhập lại mật khẩu")
        res.redirect("back")
        return
    } else if (req.body.password !== req.body.confirmPassword) {
        flash("error", "Mật khẩu không khớp")
        res.redirect("back")
        return
    }
    next()
}
module.exports.checkLogin = async (req, res, next) => {
    if (!req.body.email) {
        flash("error", "Vui lòng nhập email")
        res.redirect("back")
        return
    } else if (!req.body.password) {
        flash("error", "Vui lòng nhập mật khẩu")
        res.redirect("back")
        return
    }
    next()
}