const express = require("express")
const router = express.Router()

// Controllers
const { register, login, getUserInfo, updateUserInfo, getAllUsers } = require("../controllers/UserController")

//Middlewares
const authGuard = require("../middlewares/authGuard")

// Routes
router.post("/register", register)
router.post("/login", login)
router.get("/", authGuard, getAllUsers)
router.get("/:id", authGuard, getUserInfo)
router.put("/:id", authGuard, updateUserInfo)

module.exports = router