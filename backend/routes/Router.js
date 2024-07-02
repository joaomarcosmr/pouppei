const express = require("express")
const router = express.Router()

router.use("/user", require("./UserRoutes"))

module.exports = router