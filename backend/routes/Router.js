const express = require("express")
const router = express.Router()

router.use("/user", require("./UserRoutes"))
router.use("/category", require("./CategoryRouter"))
router.use("/creditcard", require("./CreditCardRoutes"))
router.use("/bankaccount", require("./BankAccountRouter"))
router.use("/tags", require("./TagsRouter"))
router.use("/transaction", require("./TransactionRouter"))


module.exports = router