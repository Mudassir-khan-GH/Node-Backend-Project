const { User } = require('../models/user.model')
const { uploadOnCloudinary } = require('../utils/cloudinary.js')
const bcrypt = require('bcrypt');

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

    const hashedPassword = await bcrypt.hash(password, 10);
    

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


exports.registerUser = (req, res) => {
    res.render("register")
}