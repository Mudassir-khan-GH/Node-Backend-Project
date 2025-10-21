const { Post } = require('../models/post.model')
const { uploadOnCloudinary, deleteFromCloudinary } = require('../utils/cloudinary.js')
const fs = require('fs');
const  mongoose  = require('mongoose');

exports.createPost = async (req, res) => {
    const {title, description} = req.body
    if(!title || !description || !req.file){
        return res.status(400).json({message: "All fields are required"})
    }
    try {
        const localPath = req.file.path
        const imageURL = await uploadOnCloudinary(localPath)

        if(!imageURL){
            return res.status(500).json({message: "Image upload failed"})
        }
        fs.unlinkSync(localPath)
        const newPost = new Post({title, description, image: imageURL, createdBy: req.user._id})
        await newPost.save()

        res
        .status(201)
        .redirect('/api/v1/user/home')
    } catch (error) {
       res.status(500).json({message: "Problem occured while creating post"}) 
    }
}
exports.removePost = async (req, res) => {
    const { id } = req.params
    const { image } = req.body
    const response = await Post.findByIdAndDelete({ _id: id })
    if(response){
        await deleteFromCloudinary(image)
        res
        .status(200)
        .redirect("/api/v1/post/userPosts")
    }
}
exports.userPosts = async (req, res) => {
    const { _id } = req.user
    const userPosts = await Post.find({createdBy : _id})
    res
    .status(200)
    .render("userPosts", {posts : userPosts, user: req.user})
} 