const Roles = require("../../model/roles.model")
const Accounts = require("../../model/accounts.model")
const systemConfig = require("../../config/system")
const md5 = require("md5")

module.exports.index = async (req, res) => {
    const accounts = await Accounts.find({ deleted: false })
    const roles = await Roles.find({ deleted: false })
    res.render("admin/pages/account/index", {
        accounts: accounts,
        roles: roles
    })
}
module.exports.create = async (req, res) => {
    const roles = await Roles.find({ deleted: false })
    res.render("admin/pages/account/create", {
        roles: roles
    })
}
module.exports.createPOST = async (req, res) => {
    try {
        const emailExists = await Accounts.findOne({ email: req.body.email, deleted: false });
        const phoneExists = await Accounts.findOne({ phone: req.body.phone, deleted: false });

        if (emailExists) {
            req.flash("error", "Email đã tồn tại");
            return res.redirect("back");
        }
        if (phoneExists) {
            req.flash("error", "Số điện thoại đã tồn tại");
            return res.redirect("back");
        }
        req.body.password = md5(req.body.password);
        req.body.phone = parseInt(req.body.phone);
        const newAccount = new Accounts(req.body);
        await newAccount.save();
        res.redirect(`/${systemConfig.PathAdmin}/account`);
    } catch (error) {
        console.error("Error creating account:", error);
        req.flash("error", "An error occurred while creating the account");
        res.redirect("back");
    }
};