const express = require("express")
const router = express.Router()

router.use("/user", require("./UserRoutes"))
router.use("/category", require("./CategoryRouter"))
router.use("/revenue", require("./RevenueRoutes"))
router.use("/creditcard", require("./CreditCardRoutes"))
router.use("/tags", require("./TagsRouter"))
router.use("/transaction", require("./TransactionRouter"))

module.exports = router