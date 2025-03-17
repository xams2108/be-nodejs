module.exports.check = async (req, res, next) => {
    if (!req.body.fullname) {
        req.flash("error", "Vui lòng nhập tên tài khoản")
        res.redirect("back")
        return
    } else if (!req.body.password) {
        req.flash("error", "Vui lòng nhập mật khẩu")
        res.redirect("back")
        return
    } else if (!req.body.email) {
        req.flash("error", "Vui lòng nhập email")
        res.redirect("back")
        return
    } else if (!req.body.phone) {
        req.flash("error", "Vui lòng nhập số điện thoại")
        res.redirect("back")
        return
    }
    next()
}