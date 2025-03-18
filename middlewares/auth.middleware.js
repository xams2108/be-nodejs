const systemConfig = require("../config/system")
const Account = require("../model/accounts.model")
module.exports.checktoken = async (req, res, next) => {
    if (!req.cookies.token) {
        res.redirect(`/${systemConfig}/auth/login`)
        return
    }
    const account = await Account.findOne({ token: req.cookies.token })
    if (!account) {
        res.redirect(`/${systemConfig.PathAdmin}/auth/login`)
        return
    }
    next()
}