const express = require("express")
const router = express.Router()

// Controllers
const { getAllIncomes, getIncomebyId, createincome, updateIcome, deleteIncome } = require("../controllers/IncomeController")

//Middlewares
const authGuard = require("../middlewares/authGuard")

// Routes
router.get("/", authGuard, getAllIncomes)
router.get("/:id", authGuard, getIncomebyId)
router.post("/", authGuard, createincome)
router.put("/:id", authGuard, updateIcome)
router.delete("/:id", authGuard, deleteIncome)

module.exports = router