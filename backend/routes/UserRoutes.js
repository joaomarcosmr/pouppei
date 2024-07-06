const express = require("express")
const router = express.Router()

// Controllers
const { register, login, getUserInfo, updateUserInfo } = require("../controllers/UserController")

//Middlewares
const authGuard = require("../middlewares/authGuard")

// Routes
router.post("/register", register)
router.post("/login", login)
router.get("/", authGuard, getUserInfo)
router.put("/:id", authGuard, updateUserInfo)

module.exports = router