//Get /admin/products
const Products = require("../../model/products.model")
module.exports.index = async (req,res)=>{
    let filterStatus =[
        {
            name:"Tất cả",
            status: "",
            class: ""
        },
        {
            name:"Hoạt động",
            status: "active",
            class:""
        },
        {
            name:"không hoạt động",
            status: "inactive",
            class:""
        }
    
    ]
    if(req.query.status){
        const index = filterStatus.findIndex(item => item.status == req.query.status)
        filterStatus[index].class = "active"
    }else{
        const index = filterStatus.findIndex(item => item.status == "")
        filterStatus[index].class = "active"
    }
    console.log(req.query.status)
    const find = {
        deleted: false
    }
    if(req.query.status){ //request status có giá trị không nếu có thì trả về giá trị status để lọc sản pẩm
        find.status = req.query.status
    }

    const products = await Products.find(find);
    res.render("admin/pages/products/index.pug",{
        title: "products",
        text: "Danh sach sản phẩm",
        products: products,
        filterStatus: filterStatus
    });
}