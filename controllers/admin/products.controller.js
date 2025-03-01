//Get /admin/products
const Products = require("../../model/products.model")
const FilterStatus =  require("../../helper/filterStatus")
const search =  require("../../helper/search.js")
module.exports.index = async (req,res)=>{
    const find = {
        deleted: false
    }
    filterStatus = FilterStatus(req.query)
    //filter status start
    if(req.query.status){ //request status có giá trị không nếu có thì trả về giá trị status để lọc sản pẩm
        find.status = req.query.status
    }

    const ObjectSeacrh = search(req.query)
    if (ObjectSeacrh.regex) {
        find.title = ObjectSeacrh.regex; 
    }
    
    const products = await Products.find(find);

    res.render("admin/pages/products/index.pug",{
        title: "products",
        text: "Danh sach sản phẩm",
        products: products,
        filterStatus: filterStatus,
        keyword: ObjectSeacrh.keyword
    });
}