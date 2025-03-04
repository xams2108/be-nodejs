const express = require("express")
const router = express.Router()
const controller = require("../../controllers/admin/products.controller")
router.get("/", controller.index)
router.patch("/change-status/:status/:id", controller.changStatus)
router.patch("/change-multi", controller.changeMulti)
router.delete("/delete/:id", controller.delete)
router.get("/create", controller.create)
router.post("/create", controller.createPOST)


module.exports = router; 