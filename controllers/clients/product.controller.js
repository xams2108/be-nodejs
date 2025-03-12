//Get /products
const Products = require("../../model/products.model")
module.exports.index = async (req, res) => {
    console.log("kết nối với /products/");
    const products = await Products.find({
        status: "active",
        deleted: false
    }).sort({ position: "desc" });
    const newproducts = products.map(item => {
        item.pricenew = (item.price * (100 - item.discountPercentage) / 100).toFixed(0);
        return item;
    })
    res.render('client/pages/products/index.pug', {
        title: "Danh Mục Sản phẩm",
        products: newproducts
    })
}

module.exports.detail = async (req, res) => {
    const find = {
        deleted: false,
        status: "active",
        slug: req.params.slug
    }
    const product = await Products.findOne(find) 
    res.render("client/pages/products/detail", {
        title: "Chi tiết sảm phẩm",
        product: product
    })

}