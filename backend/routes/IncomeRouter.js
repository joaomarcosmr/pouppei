const express = require("express")
const router = express.Router()

// Controllers
const { getAllIcomes, getIncomebyId, createincome, updateIcome, deleteIncome } = require("../controllers/IncomeController")

//Middlewares
const authGuard = require("../middlewares/authGuard")

// Routes
router.get("/", authGuard, getAllIcomes)
router.get("/:id", authGuard, getIncomebyId)
router.post("/", authGuard, createincome)
router.put("/:id", authGuard, updateIcome)
router.delete("/:id", authGuard, deleteIncome)

module.exports = router