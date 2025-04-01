const ProductCategory = require("../../model/products-category.model")
const { TreeHelper } = require("../../helper/createTree")
//Get /
module.exports.index = async (req, res) => {
    const category = await ProductCategory.find({ deleted: false })
    const newcategory = await TreeHelper(category)
    res.render('client/pages/home/index.pug', {
        title: "Trang chủ",
        categorys: newcategory,
    })
}