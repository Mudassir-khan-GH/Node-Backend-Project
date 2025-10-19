const express = require('express')
const { createUser, registerUser, loginUser, logoutUser, getCurrentUser, changePassword, refreshAccessToken, loginUserPage, changePasswordPage, changeImagePage, changeImage ,} = require('../controllers/user.controller.js')
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
router.post('/changeImage', verifyJWT, upload.single('image'), changeImage)
router.post('/changePassword', verifyJWT, changePassword)




router.post('/getCurrentUser', verifyJWT, getCurrentUser)
router.post('/logout', verifyJWT, logoutUser)


module.exports = router