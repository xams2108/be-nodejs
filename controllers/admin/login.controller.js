const Accounts = require("../../model/accounts.model")
const md5 = require("md5")
module.exports.index = async (req, res) => {

    res.render("admin/pages/login/index", {

    })
}
module.exports.loginPOST = async (req, res) => {

    const emailcheck = await Accounts.findOne({ email: req.body.email })
    if (!emailcheck) {
        req.flash("error", "Email không tồn tại")
        res.redirect("back")
        return
    }
    const passwordCheck = await Accounts.findOne({
        email: req.body.email,
        password: md5(req.body.password)

    })
    if (!passwordCheck) {
        console.log(md5(req.body.password))
        req.flash("error", "Mật khẩu không đúng")
        res.redirect("back")
        return
    }
    if (passwordCheck.status != "active") {
        req.flash("error", "Tài khoản đã bị khóa")
    }
    req.flash("success", "Đăng nhập thành công")
    res.redirect("/admin/dashboard")


}