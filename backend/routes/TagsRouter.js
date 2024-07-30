const express = require("express")
const router = express.Router()

// Controllers
const { getAllTags, createTag, getTagById, updateTag, deleteTag } = require("../controllers/TagsController")

//Middlewares
const authGuard = require("../middlewares/authGuard")

// Routes
router.get("/", authGuard, getAllTags)
router.get("/:id", authGuard, getTagById)
router.post("/", authGuard, createTag)
router.put("/:id", authGuard, updateTag)
router.delete("/:id", authGuard, deleteTag)

module.exports = router