const { Like } = require('../models/like.model.js')

exports.likePost = async (req, res) => {
    const {user_id, post_id} = req.params
    const response = await Like.create({
        likedBy: user_id,
        post: post_id 
    })
    if(!response) return res.status(500).json("message : an error occured while liking the post")
    
    res
    .status(200)
    .redirect("/api/v1/user/home")
}