const express = require("express")
const router = express.Router()

router.use("/user", require("./UserRoutes"))
router.use("/category", require("./CategoryRouter"))
router.use("/income", require("./IncomeRouter"))

module.exports = router