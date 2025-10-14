const express = require('express')
const { createUser, registerUser, loginUser, logoutUser, getCurrentUser, changePassword, refreshAccessToken, loginUserPage } = require('../controllers/user.controller.js')
const { upload } = require('../middlewares/multer.middleware.js')
const { verifyJWT } = require('../middlewares/auth.middleware.js')

const router = express.Router()

router.get("/register", registerUser)
router.get("/login", loginUserPage)
router.post("/create", upload.single('image'), createUser)

router.post('/login', loginUser)
router.post('/refreshToken', refreshAccessToken)

// secured routes

router.post('/logout', verifyJWT, logoutUser)
router.post('/changePassword', verifyJWT, changePassword)
router.post('/getCurrentUser', verifyJWT, getCurrentUser)


module.exports = router