const express = require("express")
const router = express.Router()

router.get("/",(req,res)=>{
    console.log("kết nối với /products/")
    res.render('client/pages/products/index.pug',{
        
    })
})

module.exports = router; 