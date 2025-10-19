const express = require("express")
const { verifyJWT } = require("../middlewares/auth.middleware.js")
const { likePost } = require("../controllers/like.controller.js")

const router = express.Router()

router.get('/add/:user_id/:post_id',verifyJWT, likePost)

module.exports = router