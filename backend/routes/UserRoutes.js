const express = require("express")
const router = express.Router()

// Controllers
const { register, login, getUserInfo } = require("../controllers/UserController")

//Middlewares
const authGuard = require("../middlewares/authGuard")

// Routes
router.post("/register", register)
router.post("/login", login)
router.get("/", authGuard, getUserInfo)

module.exports = router