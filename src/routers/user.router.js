const express = require('express')
const { createUser, registerUser, loginUser, logoutUser, getCurrentUser, changePassword, refreshAccessToken, loginUserPage, changePasswordPage, changeImagePage ,} = require('../controllers/user.controller.js')
const { upload } = require('../middlewares/multer.middleware.js')
const { verifyJWT } = require('../middlewares/auth.middleware.js')

const router = express.Router()

router.get("/register", registerUser)
router.get("/login", loginUserPage)

router.post("/create", upload.single('image'), createUser)
router.post('/login', loginUser)
router.post('/refreshToken', refreshAccessToken)

// secured routes

router.get('/changePassword', verifyJWT, changePasswordPage)
router.get('/changeImage', verifyJWT, changeImagePage)


router.post('/getCurrentUser', verifyJWT, getCurrentUser)
router.post('/logout', verifyJWT, logoutUser)


module.exports = router