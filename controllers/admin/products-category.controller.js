const ProductCategory = require("../../model/products-category.model")

const systemConfig = require("../../config/system")
//Get admin/pages/productCategory/index
module.exports.index = async (req, res) => {
    const find = {
        deleted: false
    }
    const recor = await ProductCategory.find(find)
    res.render("admin/pages/productCategory/index", {
        recors: recor
    })
}
//Get admin/pages/productCategory/create
module.exports.create = async (req, res) => {
    res.render("admin/pages/productCategory/create-category", {

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
