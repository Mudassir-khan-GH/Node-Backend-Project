const express = require('express')
const { createUser, registerUser } = require('../controllers/user.controller')

const router = express.Router()

router.get("/register", registerUser)
router.post("/create", createUser)


module.exports = router