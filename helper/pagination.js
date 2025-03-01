const Products = require("../model/products.model")
module.exports = async(query, find, numIteminPage) => {
    const ObjectPagination = {
        currentPage: 1,
        limitItem: numIteminPage,
        
    }
    if(query.page){
        ObjectPagination.currentPage = parseInt(query.page);

    }
    const countProduct = await Products.countDocuments(find)
    ObjectPagination.pages = (Math.ceil(countProduct / ObjectPagination.limitItem))
    return ObjectPagination;
}