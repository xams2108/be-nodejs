const express = require("express")
const router = express.Router()
const controller = require("../../controllers/admin/products-category.controller")
const upFileCloudMiddleWare = require("../../middlewares/upFiletoClound.middleware")
const ProductsCategoryValidate = require("../../validates/product.validate")


const multer = require("multer")
const upload = multer()


router.get("/", controller.index)
router.patch("/change-multi", controller.changeMulti)

//CREATE
router.get("/create", controller.create)
router.post("/create",
    upload.single("thumbnail"),
    ProductsCategoryValidate.checktitle,
    upFileCloudMiddleWare.uploadToCloudinary("ProductCategory"),
    controller.createPOST
)

//EDIT
router.get("/edit/:id", controller.edit)
router.patch("/edit/:id",
    upload.single("thumbnail"),
    ProductsCategoryValidate.checktitle,
    upFileCloudMiddleWare.uploadToCloudinary("ProductCategory"),
    controller.editPATCH
)

//DETAIL
router.get("/detail/:id", controller.detail)


module.exports = router

