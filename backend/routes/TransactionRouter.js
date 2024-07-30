const express = require("express")
const router = express.Router()

// Controllers
const { getAllTransactions, getTransactionById, createTransaction, updateTransaction, deleteTransaction } = require("../controllers/TransactionController")

//Middlewares
const authGuard = require("../middlewares/authGuard")

// Routes
router.get("/", authGuard, getAllTransactions)
router.get("/:id", authGuard, getTransactionById)
router.post("/", authGuard, createTransaction)
router.put("/:id", authGuard, updateTransaction)
router.delete("/:id", authGuard, deleteTransaction)

module.exports = router