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
//CREATE 
module.exports.create = async (req, res) => {
    res.render("admin/pages/roles/create", {
        title: "tạo quyền"
    })
}
module.exports.createPOST = async (req, res) => {
    const newrole = new Roles(req.body)
    await newrole.save()
    req.flash("success", `Đã tạo 1 quyền ${req.body.title}`)
    res.redirect(`/${systemConfig.PathAdmin}/roles`);

}
//CREATE END

//EDIT
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
    req.flash("success", `Cập nhật quyền ${req.body.title} thành công`)
    res.redirect(`/${systemConfig.PathAdmin}/roles`)

}
//EDIT END

//DETAIL
module.exports.detail = async (req, res) => {
    const find = {
        deleted: false,
        _id: req.params.id
    }
    const role = await Roles.findOne(find)
    res.render("admin/pages/roles/detail", {
        role: role
    })
}
//DETAIL END

module.exports.delete = async (req, res) => {
    const find = {
        deleted: false,
        _id: req.params.id
    }
    await Roles.updateOne(find, {
        deleted: true
    })
    req.flash("success", `Xóa quyền ${req.body.title} thành công`)
    res.redirect(`/${systemConfig.PathAdmin}/roles`)
}
//GET permissions
module.exports.permissions = async (req, res) => {
    let find = {
        deleted: false
    }
    const records = await Roles.find(find)
    res.render("admin/pages/roles/permissions", {
        records: records
    })
}
module.exports.permissionsPATCH = async (req, res) => {
    console.log(req.body.permissions)
    const permissions = JSON.parse(req.body.permissions)
    for (const item of permissions) {
        await Roles.updateOne({ _id: item.id }, { permissions: item.permissions })
    }
    res.redirect("back")

}