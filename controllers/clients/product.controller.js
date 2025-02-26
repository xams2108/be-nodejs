module.exports.index = (req,res)=>{
    console.log("kết nối với /products/")
    res.render('client/pages/products/index.pug',{
        title: "Danh Mục Sản phẩm"
    })
}