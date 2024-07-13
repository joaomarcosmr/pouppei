const express = require("express")
const router = express.Router()

// Controllers
const { getAllRevenue, getRevenuebyId, createRevenue, deleteRevenue, updateRevenue } = require("../controllers/RevenueController")

//Middlewares
const authGuard = require("../middlewares/authGuard")

// Routes
router.get("/", authGuard, getAllRevenue)
router.get("/:id", authGuard, getRevenuebyId)
router.post("/", authGuard, createRevenue)
router.put("/:id", authGuard, updateRevenue)
router.delete("/:id", authGuard, deleteRevenue)

module.exports = router