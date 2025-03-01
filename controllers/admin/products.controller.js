//Get /admin/products
const Products = require("../../model/products.model")
const FilterStatus =  require("../../helper/filterStatus")
module.exports.index = async (req,res)=>{
    const find = {
        deleted: false
    }
    filterStatus = FilterStatus(req.query)
    //filter status start
    if(req.query.status){ //request status có giá trị không nếu có thì trả về giá trị status để lọc sản pẩm
        find.status = req.query.status
    }
    //filter status end


    //tìm kiếm bằng keyword start
    if (req.query.keyword) {
        find.title = { $regex: req.query.keyword, $options: "i" }; 
    }
    //tìm kiếm bằng keyword end

    const keyword = req.query.keyword
    const products = await Products.find(find);

    res.render("admin/pages/products/index.pug",{
        title: "products",
        text: "Danh sach sản phẩm",
        products: products,
        filterStatus: filterStatus,
        keyword: keyword
    });
}