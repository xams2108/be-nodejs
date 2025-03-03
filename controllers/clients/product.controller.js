//Get /products
const Product = require("../../model/products.model")
module.exports.index = async(req,res)=>{
    console.log("kết nối với /products/");
    const products = await Product.find({
        status: "active",
        deleted: "false"
    }).sort({position: "desc"});
    const newproducts =products.map(item =>{
        item.pricenew = (item.price*(100-item.discountPercentage)/100).toFixed(0);
        return item;
    })
    res.render('client/pages/products/index.pug',{
        title: "Danh Mục Sản phẩm",
        products: newproducts
    })
}