const Accounts = require("../../model/accounts.model")
const md5 = require("md5")
const systemConfig = require("../../config/system")
module.exports.index = async (req, res) => {
    if (req.cookies.token) {
        const acccount = await Accounts.findOne({ token: req.cookies.token }).select("-password-token")
        if (acccount) {
            return res.redirect(`/${systemConfig.PathAdmin}/dashboard`);
        }
    }
    res.render("admin/pages/auth/index", {

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
    const user = passwordCheck
    if (user.status != "active") {
        req.flash("error", "Tài khoản đã bị khóa")
    }

    req.flash("success", "Đăng nhập thành công")
    res.cookie("token", user.token)
    res.redirect(`/admin/dashboard`)


}
module.exports.logout = async (req, res) => {
    res.clearCookie("token")
    res.redirect(`/${systemConfig.PathAdmin}/auth/login`)

}