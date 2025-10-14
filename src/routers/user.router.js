const express = require('express')
const { createUser, registerUser, loginUser, logoutUser } = require('../controllers/user.controller.js')
const { upload } = require('../middlewares/multer.middleware.js')
const { verifyJWT } = require('../middlewares/auth.middleware.js')

const router = express.Router()

router.get("/register", registerUser)
router.post("/create", upload.single('image'), createUser)

router.post('/login', loginUser)

// secured routes

router.post('/logout', verifyJWT, logoutUser)


module.exports = router