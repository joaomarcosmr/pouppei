const express = require("express")
const router = express.Router()

// Controllers
const { getAllExpense, getExpenseById, createExpense, deleteExpense, updateExpense } = require("../controllers/ExpenseController")

//Middlewares
const authGuard = require("../middlewares/authGuard")

// Routes
router.get("/", authGuard, getAllExpense)
router.get("/:id", authGuard, getExpenseById)
router.post("/", authGuard, createExpense)
router.put("/:id", authGuard, updateExpense)
router.delete("/:id", authGuard, deleteExpense)

module.exports = router