const express = require("express")
const { verifyJWT } = require("../middlewares/auth.middleware.js")

const router = express.Router()

module.exports = router