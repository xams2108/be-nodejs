const express = require("express")
const router = express.Router()
const controller = require("../../controllers/clients/cart.controller")
router.get("/", controller.index)
router.post("/add", controller.addToCart)
router.post("/delete/:productId", controller.deleteProduct)
router.get("/update/:productId/:value", controller.update)
router.get("/checkout", controller.checkout)
module.exports = router