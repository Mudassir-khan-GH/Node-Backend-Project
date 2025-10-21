const express = require('express')
const userRouter = require('./routers/user.router')
const postRouter = require('./routers/post.router')
const likeRouter = require('./routers/like.router')
const followerRouter = require('./routers/follower.router')
const app = express()
const cookieParser = require('cookie-parser')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/static', express.static('public'))
app.use(cookieParser())


app.set("view engine", "ejs")

app.use("/api/v1/user", userRouter)
app.use("/api/v1/post", postRouter)
app.use("/api/v1/like", likeRouter)
app.use("/api/v1/follower", followerRouter)

module.exports = { app }