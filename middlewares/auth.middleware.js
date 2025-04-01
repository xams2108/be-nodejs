const systemConfig = require("../config/system")
const Accounts = require("../model/accounts.model")
const Roles = require("../model/roles.model")
module.exports.checktoken = async (req, res, next) => {
    if (!req.cookies.token) {
        res.redirect(`/${systemConfig.PathAdmin}/auth/login`)
        return

    }
    let user = await Accounts.findOne({ token: req.cookies.token })
    if (!user) {
        res.redirect(`/${systemConfig.PathAdmin}/auth/login`)
        return
    }
    const role = await Roles.findOne({ _id: user.role_id })
    user = user.toObject()
    if (role) {
        delete user.role_id
        user.role = role
    }
    delete user.token
    delete user.password
    res.locals.user = user

    next()
}