const express = require("express")
const router = express.Router()

// Controllers
const { getAllCreditCards, getCreditCardById, createCreditCard, updateCreditCard, deleteCreditCard } = require("../controllers/CreditCardController")

//Middlewares
const authGuard = require("../middlewares/authGuard")

// Routes
router.get("/", authGuard, getAllCreditCards)
router.get("/:id", authGuard, getCreditCardById)
router.post("/", authGuard, createCreditCard)
router.put("/:id", authGuard, updateCreditCard)
router.delete("/:id", authGuard, deleteCreditCard)

module.exports = router