const Roles = require("../../model/roles.model")
const systemConfig = require("../../config/system")
module.exports.index = async (req, res) => {
    const find = {
        deleted: false
    }
    const records = await Roles.find(find)
    res.render("admin/pages/roles/index", {
        title: "Phân quyền",
        records: records
    })
}
module.exports.create = async (req, res) => {
    res.render("admin/pages/roles/create", {
        title: "tạo quyền"
    })
}
module.exports.createPOST = async (req, res) => {
    console.log(req.body)
    const newrole = new Roles(req.body)
    await newrole.save()
    res.redirect(`/${systemConfig.PathAdmin}/roles`);

}

module.exports.edit = async (req, res) => {
    const find = {
        deleted: false,
        _id: req.params.id
    }
    const role = await Roles.findOne(find)
    res.render("admin/pages/roles/edit", {
        role: role
    })
}
module.exports.editPATCH = async (req, res) => {
    const find = {
        deleted: false,
        _id: req.params.id
    }
    await Roles.updateOne(find, req.body)
    res.redirect(`/${systemConfig.PathAdmin}/roles`)
}