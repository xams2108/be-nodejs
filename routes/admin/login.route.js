const express = require("express")
const router = express.Router()
const validate = require("../../validates/login.validate")
const controller = require("../../controllers/admin/login.controller")
router.get("/", controller.index)

router.post("/",
    validate.check,
    controller.loginPOST)

module.exports = router