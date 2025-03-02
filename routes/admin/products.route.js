const express = require("express")
const router = express.Router()
const controller = require("../../controllers/admin/products.controller")
router.get("/", controller.index)
router.patch("/change-status/:status/:id", controller.changStatus)
module.exports = router; 