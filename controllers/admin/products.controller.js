
const Products = require("../../model/products.model")
const FilterStatus =  require("../../helper/filterStatus")
const search =  require("../../helper/search.js")
const pagination = require("../../helper/pagination.js")
//Get /admin/products
module.exports.index = async (req,res)=>{
    const find = {
        deleted: false
    }

    //filrer status
    filterStatus = FilterStatus(req.query)

    if(req.query.status){ //request status có giá trị không nếu có thì trả về giá trị status để lọc sản pẩm
        find.status = req.query.status
    }

    //search keyword
    const ObjectSearch = search(req.query)
    if (ObjectSearch.regex) {
        find.title = ObjectSearch.regex; 
    }
    


    //Pagination
    const ObjectPagination =  await pagination(req.query, find,5);
    const indexItem = await Products.countDocuments(find).sort({position: "desc"}); //desc sắp xếp theo giảm dần //asc sắp xếp tăng dần
    const products = await Products.find(find).limit(ObjectPagination.limitItem).skip((ObjectPagination.currentPage-1)*ObjectPagination.limitItem);

   
    res.render("admin/pages/products/index.pug",{
        title: "products",
        text: "Danh sach sản phẩm",
        products: products,
        filterStatus: filterStatus,
        keyword: ObjectSearch.keyword,
        Pagination : ObjectPagination,
        indexItem : indexItem
    });
}
//PATCH /admin/products/change-status
module.exports.changStatus  = async(req,res) =>{
    const status = req.params.status;
    const id = req.params.id;
    await Products.updateOne({_id: id}, {
        status: status
    });
    res.redirect("back");
    
}


//PATCH /admin/products/change-multi
module.exports.changeMulti = async(req, res) =>{
    const type = req.body.type;
    const ids = req.body.ids.split(",").map(id => id.trim());
    
    switch (type){
        case "active":
            await Products.updateMany({ _id: { $in: ids } }, { $set: { status: type } });
            break;
        case "inactive":
            await Products.updateMany({ _id: { $in: ids } }, { $set: { status: type } });
            break;
        case "delete":
            await Products.updateMany({_id: {$in:ids}}, {deleted: true, deletedAt: new Date()})
            break;
        case "change-position":
            for(let item of ids){
                let [id, position] = item.split("-");
                position = parseInt(position);
                await Products.updateOne({_id:id}, {position: position});
            }
            break;

    }   

    res.redirect("back");
}

//PATCH /admin/products/delete
module.exports.delete = async(req,res) =>{
    id = req.params.id
    await Products.updateOne({_id:id},{
        deleted: true,
        deletedAt: new Date()
    })
    res.redirect("back")

}

//PATCH /admin/products/delete