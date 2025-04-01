const express = require("express")
const router = express.Router()
const controller = require("../../controllers/clients/user.controller")
const validate = require("../../validates/user.validate")
router.get("/register", controller.register)
router.post("/register",
    validate.checkregister,
    controller.registerPOST)
router.get("/login", controller.login)
router.post("/login",
    validate.checkLogin,
    controller.loginPOST)
router.get("/logout", controller.logout)
router.get("/forgotpassword", controller.forgotpassword)
router.post("/forgotpassword", controller.forgotpasswordPOST)
router.get("/password/otp", controller.otppassword)
router.post("/password/otp", controller.otppasswordPOST)
router.get("/password/reset", controller.resetpassword)
router.post("/password/reset", controller.resetpasswordPOST)
module.exports = router