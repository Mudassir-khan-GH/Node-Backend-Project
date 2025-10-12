const jwt = require('jsonwebtoken');

const generateAccessToken = (data) => {
    return jwt.sign(
        {
            _id : data._id,
            email : data.email,
            username : data.username
        }, 
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn : process.env.ACCESS_TOKEN_EXPIRY})
}

const generateRefreshToken = (data) => {
    return jwt.sign(
        {
            _id : data._id
        }, 
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn : process.env.REFRESH_TOKEN_EXPIRY})
}

module.exports = { generateAccessToken, generateRefreshToken }
