//Get /admin/products
const Products = require("../../model/products.model")
module.exports.index = async (req,res)=>{
    const products = await Products.find({
        deleted: false
    });
    res.render("admin/pages/products/index.pug",{
        title: "products",
        text: "ĐAY page product",
        products: products
    });
}