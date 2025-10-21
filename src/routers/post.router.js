const express = require("express")
const { verifyJWT } = require("../middlewares/auth.middleware.js")
const { createPost, userPosts, removePost } = require("../controllers/post.controller.js")
const { upload } = require("../middlewares/multer.middleware.js")


const router = express.Router()

router.post('/createPost',verifyJWT, upload.single('image'), createPost)
router.get("/userPosts",verifyJWT, userPosts)
router.post("/removePost/:id",verifyJWT, removePost)

module.exports = router