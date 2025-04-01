const md5 = require("md5")
const User = require("../../model/users.model")
const ForgotPassword = require("../../model/forgotpassword.model")

const sendMailHelper = require("../../helper/sendMail")
const flash = require("express-flash")


module.exports.register = async (req, res) => {
    res.render("client/pages/user/register")
}
module.exports.registerPOST = async (req, res) => {

    const user = await User.findOne({ email: req.body.email, deleted: false })
    if (user) {
        flash("error", "Email đã tồn tại")
        res.redirect("back")
        return
    }

    delete req.body.confirmPassword
    req.body.password = md5(req.body.password)
    console.log(req.body)
    const newuser = new User(req.body)
    await newuser.save()
    req.flash("success", "Đăng ký thành công! Vui lòng đăng nhập.");
    res.cookie("tokenuser", newuser.token)
    res.redirect("/")
}
module.exports.login = async (req, res) => {
    res.render("client/pages/user/login")
}
module.exports.loginPOST = async (req, res) => {
    const user = await User.findOne({ email: req.body.email, deleted: false })
    if (!user) {
        flash("error", "Email không tồn tại")
        res.redirect("back")
        return
    }
    if (md5(req.body.password) !== user.password) {
        flash("error", "Mật khẩu không đúng")
        res.redirect("back")
        return
    }
    res.cookie("tokenuser", user.token)
    res.redirect("/")
}
module.exports.logout = async (req, res) => {
    res.clearCookie("tokenuser")
    res.redirect("back")
}
module.exports.forgotpassword = async (req, res) => {
    res.render("client/pages/user/forgotpassword")
}
module.exports.forgotpasswordPOST = async (req, res) => {
    if (!req.body.email) {
        req.flash("error", "Vui lòng nhập email")
        res.redirect("back")
        return
    }
    const user = await User.findOne({ email: req.body.email, deleted: false })
    if (!user) {
        req.flash("error", "Email không tồn tại")
        res.redirect("back")
        return
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    const objectforgotpassword = {
        email: req.body.email,
        Otp: otp,
        expiredAt: Date.now()
    }
    sendMailHelper.sendMail(req.body.email, "Mã OTP", objectforgotpassword.Otp)
    const newforgotpassword = new ForgotPassword(objectforgotpassword)
    await newforgotpassword.save()
    res.redirect("/user/password/otp?email=" + req.body.email)
}
module.exports.otppassword = async (req, res) => {
    const email = req.query.email
    res.render("client/pages/user/passwordOTP", { email: email })
}
module.exports.otppasswordPOST = async (req, res) => {
    const email = req.body.email
    const forgotpassword = await ForgotPassword.findOne({ email: email })
    if (!forgotpassword) {
        res.redirect("back")
        return
    }
    if (forgotpassword.Otp !== req.body.otp) {
        req.flash("error", "Mã OTP không đúng")
        res.redirect("back")
        return
    }
    const user = await User.findOne({ email: email, deleted: false })
    res.cookie("tokenuser", user.token)
    res.redirect("/user/password/reset")

}
module.exports.resetpassword = async (req, res) => {

    res.render("client/pages/user/passwordReset")
}
module.exports.resetpasswordPOST = async (req, res) => {
    if (!req.body.password) {
        req.flash("error", "Vui lòng nhập mật khẩu")
        res.redirect("back")
        return
    }
    if (req.body.password !== req.body.confirmPassword) {
        req.flash("error", "Mật khẩu không khớp")
        res.redirect("back")
        return
    }
    const user = await User.findOne({ token: req.cookies.tokenuser, deleted: false })
    if (!user) {
        res.redirect("/user/login")
        return
    }
    user.password = md5(req.body.password)
    await user.save()
    res.clearCookie("tokenuser")
    req.flash("success", "Đặt lại mật khẩu thành công! Vui lòng đăng nhập.");
    res.redirect("/user/login")

}