const ProductCategory = require("../../model/products-category.model")
const systemConfig = require("../../config/system")
const FilterStatus = require("../../helper/filterStatus")
const Search = require("../../helper/search.js")
const Pagination = require("../../helper/pagination.js")
const { TreeHelper } = require("../../helper/createTree")
const { find } = require("../../model/products.model.js")

//Get admin/pages/productCategory/index
module.exports.index = async (req, res) => {


    const search = Search(req.query)
    const find = {
        deleted: false
    }
    const filterStatus = FilterStatus(req.query)
    if (req.query.status) {
        find.status = req.query.status
    }
    const ObjectSearch = Search(req.query)
    if (ObjectSearch.regex) {
        find.title = ObjectSearch.regex;
    }

    let sort = {}
    if (req.query.sortkey && req.query.sortvalue) {
        sort[req.query.sortkey] = req.query.sortvalue
    } else {
        sort.position = "desc"
    }
    const ObjectPagination = await Pagination(req.query, find, 5, "products-category");
    const recor = await ProductCategory.find(find).sort(sort).limit(ObjectPagination.limitItem).skip((ObjectPagination.currentPage - 1) * ObjectPagination.limitItem);
    res.render("admin/pages/productCategory/index", {
        recors: recor,
        filterStatus: filterStatus,
        keyword: ObjectSearch.keyword,
        Pagination: ObjectPagination,

    })
}
//Get admin/pages/productCategory/create
module.exports.create = async (req, res) => {
    const find = {
        deleted: false,
    }

    const recor = await ProductCategory.find(find)
    const newrecor = await TreeHelper(recor)
    res.render("admin/pages/productCategory/create-category", {
        recors: newrecor
    })
}

//Post admin/pages/productCategory/create
module.exports.createPOST = async (req, res) => {
    console.log(req.body)
    if (req.body.position == "") {
        const count = await ProductCategory.countDocuments();
        req.body.position = count + 1;
    } else {
        req.body.position = parseInt(req.body.position);
    }
    const productCategory = new ProductCategory(req.body)
    await productCategory.save()

    res.redirect(`/${systemConfig.PathAdmin}/products-category`)

}
//Change Multi
module.exports.changeMulti = async (req, res) => {
    const type = req.body.type;
    const ids = req.body.ids.split(",").map(id => id.trim());

    switch (type) {
        case "active":
            await ProductCategory.updateMany({ _id: { $in: ids } }, { $set: { status: type } });
            req.flash("success", `Cập nhật trạng thái ${ids.length} sản phẩm đã thành công`)
            break;
        case "inactive":
            await ProductCategory.updateMany({ _id: { $in: ids } }, { $set: { status: type } });
            req.flash("success", `Cập nhật trạng thái ${ids.length} sản phẩm đã thành công`)
            break;
        case "delete":
            await ProductCategory.updateMany({ _id: { $in: ids } }, { deleted: true, deletedAt: new Date() })
            req.flash("success", `Đã xóa ${ids.length} sản phẩm đã thành công`)
            break;
        case "change-position":
            for (let item of ids) {
                let [id, position] = item.split("-");
                position = parseInt(position);
                await ProductCategory.updateOne({ _id: id }, { position: position });
            }
            req.flash("success", `Cập nhật trạng thái ${ids.length} sản phẩm đã thành công`)
            break;

    }

    res.redirect("back");
}

//GET admin/pages/productCategory/edit
module.exports.edit = async (req, res) => {
    const find = {
        deleted: false
    }
    const recor = await ProductCategory.find(find)
    const category = recor.find((item) =>
        item._id == req.params.id && item.deleted == false
    );
    const newrecor = await TreeHelper(recor)
    res.render("admin/pages/productCategory/edit-category", {
        recors: newrecor,
        category: category
    })
}

//PATCH admin/pages/productCategory/edit
module.exports.editPATCH = async (req, res) => {
    req.body.position = parseInt(req.body.position)
    try {
        await ProductCategory.updateOne({ _id: req.params.id }, req.body)
        req.flash("success", "Cập nhật thành công")

    } catch (error) {
        req.flash("error", "Cập nhật thất bại")
    }
    res.redirect(`/${systemConfig.PathAdmin}/products-category`)
}

//GET admin/pages/products-category/detail
module.exports.detail = async (req, res) => {
    const find = {
        deleted: false,
        _id: req.params.id
    }
    const item = await ProductCategory.findOne(find)
    res.render("admin/pages/productCategory/detail-category", {
        item: item
    })
}

module.exports.delete = async (req, res) => {
    const find = {
        deleted: false,
        _id: req.params.id
    }
    await ProductCategory.updateOne({ _id: req.params.id }, { $set: { deleted: true } })
    res.redirect("back")
}