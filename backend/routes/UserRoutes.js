const express = require("express")
const router = express.Router()

// Controllers
const { register, login, getCurrentUser, update, getUserById } = require("../controllers/UserController")

//Middlewares
// const { userCreateValidation, loginValidation, userUpdateValidation } = require('../middlewares/userValidation')
// const authGuard = require("../middlewares/authGuard")

// Routes
router.post("/register", register)
router.post("/login", login)
router.get("/", getCurrentUser)
router.put("/:id", update)
router.get("/:id", getUserById)

module.exports = router