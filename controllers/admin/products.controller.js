module.exports.index = (req,res)=>{
    res.render("admin/pages/products/index.pug",{
        title: "products",
        text: "ĐAY page product"
    });
}