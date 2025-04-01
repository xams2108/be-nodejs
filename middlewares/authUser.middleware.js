const User = require("../model/users.model")
module.exports.checkUser = async (req, res, next) => {
    if (req.path.startsWith('/user')) {
        return next();
    }
    if (!req.cookies.tokenuser) {
        res.redirect("/user/login")
        return
    }
    const user = await User.findOne({ token: req.cookies.tokenuser }).select("-password")
    if (!user) {
        res.clearCookie("tokenuser")
        res.redirect("/user/login")
        return
    }
    res.locals.user = user
    next()
}
