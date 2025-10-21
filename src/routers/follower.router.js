const express = require("express")
const { verifyJWT } = require("../middlewares/auth.middleware.js")
const { followUser, unFollowUser } = require("../controllers/follower.controller.js")

const router = express.Router()

router.get('/follow/:followerId/:followedToId',verifyJWT, followUser)
router.get('/unFollow/:followerId/:followedToId',verifyJWT, unFollowUser)

module.exports = router