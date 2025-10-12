const express = require('express')
const { createUser, registerUser } = require('../controllers/user.controller.js')
const { upload } = require('../middlewares/multer.middleware.js')

const router = express.Router()

router.get("/register", registerUser)


router.post("/create", upload.single('image'), createUser)


module.exports = router