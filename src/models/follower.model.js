const mongoose = require("mongoose")

const followerSchema = mongoose.Schema({
    follower: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    followedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
},{timestamps : true})

const Follower = mongoose.model("Follower", followerSchema)

module.exports = {Follower}