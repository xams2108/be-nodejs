const express = require("express")
const multer = require("multer")
const upload = multer()
const router = express.Router()
const controller = require("../../controllers/admin/account.controller")
const validate = require("../../validates/account.validate")
const upFileCloudMiddleWare = require("../../middlewares/upFiletoClound.middleware")



router.get("/", controller.index)

router.get("/create", controller.create)

router.post("/create",
    upload.single("thumbnail"),
    validate.check,
    upFileCloudMiddleWare.uploadToCloudinary("account"),
    controller.createPOST)


module.exports = router
