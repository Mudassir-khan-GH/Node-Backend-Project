const jwt = require('jsonwebtoken');
const { User } = require('../models/user.model.js');
try {
    const verifyJWT = async (req, res, next) => {
        const token = req.cookies?.accessToken;
    
        if (!token) return res.status(401).json({ message: "Unauthorized Access" })
    
        decoded_data = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
        const user = await User.findById(
            decoded_data._id
        ).select("-password -__v -createdAt -updatedAt -image -refreshToken")
    
        if (!user) return res.status(401).json({ message: "User not found" })
    
        req.user = user
        next()
    
    }
} catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
}

module.exports = { verifyJWT }