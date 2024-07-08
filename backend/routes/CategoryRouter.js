const express = require("express")
const router = express.Router()

// Controllers
const { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory } = require("../controllers/CategoryController")

//Middlewares
const authGuard = require("../middlewares/authGuard")

// Routes
router.get("/", authGuard, getAllCategories)
router.get("/:id", authGuard, getCategoryById)
router.post("/", authGuard, createCategory)
router.put("/:id", authGuard, updateCategory)
router.delete("/:id", authGuard, deleteCategory)

module.exports = router