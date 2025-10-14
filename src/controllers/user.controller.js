const { User } = require('../models/user.model')
const { uploadOnCloudinary } = require('../utils/cloudinary.js')
const bcrypt = require('bcrypt');
const { hashPassword, comparePassword } = require('../utils/bcryptFunctions.js')
const { generateAccessToken, generateRefreshToken } = require('../utils/generateTokens.js')


const options = {
    httpOnly: true,
    secure: true
}


exports.createUser = async (req, res) => {
    const { username, email, password, image } = req.body;


    if ([username, email, password, image].some((field) => field?.trim() === "")) {
        return res.status(400).json({ message: "All fields are required" })
    }

    const result = await User.findOne({ email: email })
    if (result) {
        return res.status(400).json({ message: "Email already exists" })
    }

    const imageLocalPath = req.file?.path
    if (!imageLocalPath) {
        return res.status(400).json({ message: "Image is required" })
    }

    const imageURL = await uploadOnCloudinary(imageLocalPath)


    if (!imageURL) {
        return res.status(500).json({ message: "Image upload failed" })
    }

    const hashedPassword = await hashPassword(password);


    try {
        const createdUser = await User.create({ username, email, password: hashedPassword, image: imageURL })

        console.log(createdUser);

        const confirmation = await User.findById(createdUser._id).select("-password -__v -createdAt -updatedAt -image")
        if (!confirmation) {
            return res.status(500).json({ message: "User creation failed" })
        }
        res.status(200).json({ createdUser })
    } catch (error) {
        res.status(500).json({ message: "Error creating user" })
    }
}

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (password === "" || email === "") {
        return res.status(400).json({ message: "All fields are required" })
    }

    const user = await User.findOne({ email: email })
    if (!user) return res.status(400).json({ message: "User not registered !!" })

    if (!await comparePassword(password, user.password)) return res.status(400).json({ message: "Invalid credentials !!" })

    const accessToken = generateAccessToken(user)
    const refreshToken = generateRefreshToken(user)

    User.refreshToken = refreshToken
    await User.save({ validateBeforeSave: false })

    const loggedInUser = await User.findById(user._id).select("-password -__v -createdAt -updatedAt -image -refreshToken")

    return res.status(200)
        .cookie("refreshToken", refreshToken, options)
        .cookie("accessToken", accessToken, options)
        .json({ message: "login Successful" })

}

exports.logoutUser = async (req, res) => {
    const user = await User.findOneAndUpdate(
        decoded_data._id,
        {
            $set: { refreshToken: undefined }
        })
    if (!user) return res.status(401).json({ message: "User not found" })

    res.status(200)
        .clearCookie("refreshToken", options)
        .clearCookie("accessToken", options)
        .json({ message: "Logout Successful" })
}

exports.registerUser = (req, res) => {
    res.render("register")
}