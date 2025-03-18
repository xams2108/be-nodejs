const express = require("express")
const router = express.Router()
const validate = require("../../validates/login.validate")
const controller = require("../../controllers/admin/login.controller")
router.get("/login", controller.index)

router.post("/login",
    validate.check,
    controller.loginPOST)
router.get("/logout", controller.logout)
module.exports = router