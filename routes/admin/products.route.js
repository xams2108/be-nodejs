const express = require("express")
const router = express.Router()
const multer = require("multer")
const upload = multer()
const productValidate = require("../../validates/product.validate")
const upFileCloudMiddleWare = require("../../middlewares/upFiletoClound.middleware")
const controller = require("../../controllers/admin/products.controller")



router.get("/", controller.index)
router.patch("/change-status/:status/:id", controller.changStatus)
router.patch("/change-multi", controller.changeMulti)
router.delete("/delete/:id", controller.delete)
router.get("/create", controller.create)
router.post("/create",
    upload.single("thumbnail"),
    productValidate.createPost,
    upFileCloudMiddleWare.uploadToCloudinary,
    controller.createPOST
);
router.get("/edit/:id", controller.edit)
router.patch("/edit/:id",
    upload.single("thumbnail"),
    productValidate.createPost,
    upFileCloudMiddleWare.uploadToCloudinary,
    controller.editPatch
);

router.get("/detail/:id", controller.detail)

module.exports = router; 