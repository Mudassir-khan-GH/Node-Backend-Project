const { User } = require('../models/user.model')
const { uploadOnCloudinary, deleteFromCloudinary } = require('../utils/cloudinary.js')
const bcrypt = require('bcrypt');
const { hashPassword, comparePassword } = require('../utils/bcryptFunctions.js')
const { generateAccessToken, generateRefreshToken } = require('../utils/generateTokens.js')
const jwt = require('jsonwebtoken');
const fs = require('fs');

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

    fs.unlinkSync(imageLocalPath)

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

    user.refreshToken = refreshToken
    await user.save({ validateBeforeSave: false })

    const loggedInUser = await User.findById(user._id).select("-password -__v -createdAt -updatedAt -image -refreshToken")

    return res.status(200)
        .cookie("refreshToken", refreshToken, options)
        .cookie("accessToken", accessToken, options)
        .json({ message: "login Successful" })

}

exports.logoutUser = async (req, res) => {
    const user = await User.findOneAndUpdate(
        { _id: decoded_data._id },
        {
            $set: { refreshToken: undefined }
        })
    if (!user) return res.status(401).json({ message: "User not found" })

    res.status(200)
        .clearCookie("refreshToken", options)
        .clearCookie("accessToken", options)
        .json({ message: "Logout Successful" })
}

exports.refreshAccessToken = async(req, res) => {
    const incomingRefreshToken = req.cookies?.refreshToken
    if (!incomingRefreshToken) return res.status(401).json({ message: "Unauthorized Access" })

    const decoded_token = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)

    const user = await User.findById(decoded_token._id).select("-password -__v -createdAt -updatedAt -image")
    if (!user) return res.status(401).json({ message: "User not found" })
    
    if(user.refreshToken !== incomingRefreshToken) return res.status(401).json({ message: "Invalid refresh token" })

    const accessToken = generateAccessToken(user)
    const refreshToken = generateRefreshToken(user)

    user.refreshToken = refreshToken
    await user.save({ validateBeforeSave: false })

    return res.status(200)
    .cookie("refreshToken", refreshToken, options)
    .cookie("accessToken", accessToken, options)
    .json({ message: "Tokens Refreshed Successfully" })
}

exports.changePassword = async(req, res) => {
    const { oldPassword, newPassword } = req.body
    if ([oldPassword, newPassword].some((field) => field?.trim() === "")) {
        return res.status(400).json({ message: "All fields are required" })
    }

    const user = await User.findById(req.user?._id)
    if (!user) return res.status(401).json({ message: "User not found" })
    
    const isPasswordMatched = comparePassword(oldPassword, user.password)
    if (!isPasswordMatched) return res.status(400).json({ message: "Password is incorrect" })

    user.password = await hashPassword(newPassword)
    await user.save({validateBeforeSave : false})

    res.status(200).json({ message: "Password changed successfully" })
}

exports.getCurrentUser = async (req, res) => {
    const user = req.user
    res.status(200).json({ user })
}

exports.changeImage = async(req, res) => {
    const imageLocalPath = req.file?.path
    if (!imageLocalPath) {
        return res.status(400).json({ message: "Image is required" })
    }
    const imageURL = await uploadOnCloudinary(imageLocalPath)
    if (!imageURL){
        return res.status(500).json({ message: "Image upload on cloudinary failed" })
    }

    const userForGettingPreviousImageURL = await User.findById(req.user?._id)
    if(!userForGettingPreviousImageURL) return res.status(401).json({ message: "User not found" })
    
    const previousImageURL = userForGettingPreviousImageURL.image
    if(!previousImageURL){
        return res.status(404).json({ message: "No previous image found" })
    }

    await deleteFromCloudinary(previousImageURL)

    const user = await User.findByIdAndUpdate(req.user?._id, { image: imageURL }, { new: true })
    if (!user) return res.status(401).json({ message: "User not found" })
    
    await deleteFromCloudinary(req.user)

    res.status(200).json({ message: "Image updated successfully", image: user.image })
}

exports.registerUser = (req, res) => {
    res.render("register")
}

exports.loginUserPage = (req, res) => {
    res.render("login")
}
