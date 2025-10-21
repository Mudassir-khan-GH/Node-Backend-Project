const { Follower } = require("../models/follower.model.js")

exports.followUser = async (req, res) => {
    const { followerId , followedToId } = req.params
    const response = await Follower.create({
        follower: followerId,
        followedTo: followedToId
    })
    if(!response) return res.status(500).json({message: "Failed to follow user"})

    res
    .status(200)
    .redirect("/api/v1/user/home")
}

exports.unFollowUser = async (req, res) => {
    const { followerId , followedToId } = req.params
    const response = await Follower.findOneAndDelete({
        follower: followerId,
        followedTo: followedToId
    })
    if(!response) return res.send(500).json({message: "Failed to unfollow user"})

    res
    .status(200)
    .redirect("/api/v1/user/home")
}