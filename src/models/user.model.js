const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minlength: [8 , "Password must be at least 8 characters long"],
    },
    image:{
        type: String,
        default: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vecteezy.com%2Ffree-vector%2Fdefault-user&psig=AOvVaw2UDDDb0k2fKrtekcFETmcb&ust=1760191790472000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCODmqcTnmZADFQAAAAAdAAAAABAE"
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    refreshToken:
    {
        type: String,
        default: null,
    },
    verification:{
        type: Boolean,
        default: false,
    },
    verificationCode: {
        type: String,
        default: null,
    }
}, { timestamps: true })

const User = mongoose.model("User", userSchema)

module.exports = { User }