const ProductCategory = require("../../model/products-category.model")
const systemConfig = require("../../config/system")
const FilterStatus = require("../../helper/filterStatus")
const Search = require("../../helper/search.js")
const Pagination = require("../../helper/pagination.js")
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

    function createtree(arr, parentid = "") {
        const tree = []
        arr.forEach(item => {
            if (item.parent_id === parentid) {
                const newItem = item
                const children = createtree(arr, item._id)
                if (children) {
                    newItem.children = children
                }
                tree.push(newItem)
            }

        });
        return tree
    }

    const recor = await ProductCategory.find(find)
    const newrecor = await createtree(recor)
    console.log(newrecor)
    res.render("admin/pages/productCategory/create-category", {
        recors: newrecor
    })
}

//Post admin/pages/productCategory/create
module.exports.createPOST = async (req, res) => {
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