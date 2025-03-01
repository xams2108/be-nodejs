//Get /admin/products
const Products = require("../../model/products.model")
const FilterStatus =  require("../../helper/filterStatus")
const search =  require("../../helper/search.js")
const pagination = require("../../helper/pagination.js")
module.exports.index = async (req,res)=>{
    const find = {
        deleted: false
    }
    filterStatus = FilterStatus(req.query)
    //filrer status
    if(req.query.status){ //request status có giá trị không nếu có thì trả về giá trị status để lọc sản pẩm
        find.status = req.query.status
    }

    //search keyworđ
    const ObjectSearch = search(req.query)
    if (ObjectSearch.regex) {
        find.title = ObjectSearch.regex; 
    }
    


    //Pagination
    const ObjectPagination =  await pagination(req.query, find,5);
    const products = await Products.find(find).limit(ObjectPagination.limitItem).skip((ObjectPagination.currentPage-1)*ObjectPagination.limitItem);

   
    res.render("admin/pages/products/index.pug",{
        title: "products",
        text: "Danh sach sản phẩm",
        products: products,
        filterStatus: filterStatus,
        keyword: ObjectSearch.keyword,
        Pagination : ObjectPagination
    });
}