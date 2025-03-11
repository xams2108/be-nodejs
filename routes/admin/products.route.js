const express = require("express")
const router = express.Router()
const multer = require("multer")
const storagemulter = require("../../helper/storageImage")
const upload = multer({ storage: storagemulter() })
const productValidate = require("../../validates/product.validate")
const controller = require("../../controllers/admin/products.controller")

router.get("/", controller.index)
router.patch("/change-status/:status/:id", controller.changStatus)
router.patch("/change-multi", controller.changeMulti)
router.delete("/delete/:id", controller.delete)
router.get("/create", controller.create)
router.post("/create",
    upload.single("thumbnail"),
    productValidate.createPost,
    controller.createPOST
);
router.get("/edit/:id", controller.edit)
router.patch("/edit/:id",
    upload.single("thumbnail"),
    productValidate.createPost,
    controller.editPatch)
module.exports = router; 