const express = require("express")
const router = express.Router()
const controller = require("../../controllers/admin/dashboad.controller")
router.get("/", controller.dashboard)

module.exports = router; 