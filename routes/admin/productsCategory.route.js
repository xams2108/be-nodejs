const express = require("express")
const router = express.Router()
const controller = require("../../controllers/admin/products-category.controller")
const upFileCloudMiddleWare = require("../../middlewares/upFiletoClound.middleware")
const ProductsCategoryValidate = require("../../validates/product.validate")


const multer = require("multer")
const upload = multer()


router.get("/", controller.index)

router.get("/create", controller.create)

router.post("/create",
    upload.single("thumbnail"),
    ProductsCategoryValidate.createPost,
    upFileCloudMiddleWare.uploadToCloudinary("ProductCategory"),
    controller.createPOST
)
module.exports = router