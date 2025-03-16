
const Products = require("../../model/products.model")
const FilterStatus = require("../../helper/filterStatus")
const search = require("../../helper/search.js")
const pagination = require("../../helper/pagination.js")
const systemConfig = require("../../config/system")
const mongoose = require("mongoose");

//Get /admin/products
module.exports.index = async (req, res) => {
    const find = {
        deleted: false
    }

    //filrer status
    filterStatus = FilterStatus(req.query)

    if (req.query.status) { //request status có giá trị không nếu có thì trả về giá trị status để lọc sản pẩm
        find.status = req.query.status
    }

    //search keyword
    const ObjectSearch = search(req.query)
    if (ObjectSearch.regex) {
        find.title = ObjectSearch.regex;
    }

    let sort = {}
    if (req.query.sortkey && req.query.sortvalue) {
        sort[req.query.sortkey] = req.query.sortvalue
    } else {
        sort.position = "desc"
    }


    //Pagination
    const ObjectPagination = await pagination(req.query, find, 5, "products");
    const products = await Products.find(find).sort(sort).limit(ObjectPagination.limitItem).skip((ObjectPagination.currentPage - 1) * ObjectPagination.limitItem);
    res.render("admin/pages/products/index.pug", {
        title: "products",
        text: "Danh sach sản phẩm",
        products: products,
        filterStatus: filterStatus,
        keyword: ObjectSearch.keyword,
        Pagination: ObjectPagination,
    });
}
//PATCH /admin/products/change-status
module.exports.changStatus = async (req, res) => {
    const status = req.params.status;
    const id = req.params.id;
    await Products.updateOne({ _id: id }, {
        status: status
    });
    req.flash("success", "Cập nhật trạng thái đã thành công")
    res.redirect("back");

}


//PATCH /admin/products/change-multi
module.exports.changeMulti = async (req, res) => {
    const type = req.body.type;
    const ids = req.body.ids.split(",").map(id => id.trim());

    switch (type) {
        case "active":
            await Products.updateMany({ _id: { $in: ids } }, { $set: { status: type } });
            req.flash("success", `Cập nhật trạng thái ${ids.length} sản phẩm đã thành công`)
            break;
        case "inactive":
            await Products.updateMany({ _id: { $in: ids } }, { $set: { status: type } });
            req.flash("success", `Cập nhật trạng thái ${ids.length} sản phẩm đã thành công`)
            break;
        case "delete":
            await Products.updateMany({ _id: { $in: ids } }, { deleted: true, deletedAt: new Date() })
            req.flash("success", `Đã xóa ${ids.length} sản phẩm đã thành công`)
            break;
        case "change-position":
            for (let item of ids) {
                let [id, position] = item.split("-");
                position = parseInt(position);
                await Products.updateOne({ _id: id }, { position: position });
            }
            req.flash("success", `Cập nhật trạng thái ${ids.length} sản phẩm đã thành công`)
            break;

    }

    res.redirect("back");
}

//PATCH /admin/products/delete
module.exports.delete = async (req, res) => {
    id = req.params.id
    await Products.updateOne({ _id: id }, {
        deleted: true,
        deletedAt: new Date()
    })
    req.flash("success", "Đã xóa sản phẩm thành công")
    res.redirect("back")

}

//GET /admin/products/create
module.exports.create = (req, res) => {
    res.render("admin/pages/products/create", {

    })
}

//POST /admin/products/create
module.exports.createPOST = async (req, res) => {
    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);
    if (req.body.position == "") {
        const count = await Products.countDocuments();
        req.body.position = count + 1;
    } else {
        req.body.position = parseInt(req.body.position);
    }
    const product = new Products(req.body)
    await product.save()
    res.redirect(`/${systemConfig.PathAdmin}/products`)
}
//GET admin/pages/products/edit
module.exports.edit = async (req, res) => {
    const find = {
        deleted: false,
        _id: req.params.id
    }
    const product = await Products.findOne(find)
    res.render("admin/pages/products/edit", {
        product: product
    })

}
//PATCH admin/pages/products/edit
module.exports.editPatch = async (req, res) => {
    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);
    req.body.position = parseInt(req.body.position)

    try {
        await Products.updateOne({ _id: req.params.id }, req.body)
        req.flash("success", "Cập nhật thành công")

    } catch (error) {
        req.flash("error", "Cập nhật thất bại")
    }

    res.redirect(`/${systemConfig.PathAdmin}/products`)

}

//GET admin/pages/product/detail
module.exports.detail = async (req, res) => {
    const find = {
        deleted: false,
        _id: req.params.id
    }
    const product = await Products.findOne(find)
    res.render("admin/pages/products/detail", {
        product: product
    })
}