const express = require("express")
const router = express.Router()

// Controllers
const { getAllBankAccounts, getBankAccountById, createBankAccount, updateBankAccount, deleteBankAccount } = require("../controllers/BankAccountController")

//Middlewares
const authGuard = require("../middlewares/authGuard")

// Routes
router.get("/", authGuard, getAllBankAccounts)
router.get("/:id", authGuard, getBankAccountById)
router.post("/", authGuard, createBankAccount)
router.put("/:id", authGuard, updateBankAccount)
router.delete("/:id", authGuard, deleteBankAccount)

module.exports = router