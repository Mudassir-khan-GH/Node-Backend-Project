const { User } = require('../models/user.model')

exports.createUser = async (req,res) => {
    const { username , email , password , image } = req.body;
    const createdUser = await User.create({ username , email , password , image  })
    res.status(200).json({ createdUser })
}
exports.registerUser = (req, res) => {
    res.render("register")
}