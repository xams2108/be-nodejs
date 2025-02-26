const express = require("express")
const router = express.Router()

router.get("/",(req,res)=>{
    console.log("Kết nối với trang chủ")
    res.render('client/pages/home/index.pug',{

    })
})

module.exports = router; 