module.exports.index =(req,res)=>{
    console.log("Kết nối với trang chủ")
    res.render('client/pages/home/index.pug',{
        title: "Trang chủ"
    })
}