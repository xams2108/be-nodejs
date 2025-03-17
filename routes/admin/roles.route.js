const express = require("express")
const router = express.Router()
const multer = require("multer")
const upload = multer()
const controller = require("../../controllers/admin/roles.controller")
router.get("/", controller.index)
//CREATE
router.get("/create", controller.create)
router.post("/create", controller.createPOST)

//EDIT
router.get("/edit/:id", controller.edit)
router.patch("/edit/:id", controller.editPATCH)

//DETAIL
router.get("/detail/:id", controller.detail)

//DELETE
router.patch("/delete/:id", controller.delete)

//permissions
router.get("/permissions", controller.permissions)
router.patch("/permissions", controller.permissionsPATCH)












module.exports = router

