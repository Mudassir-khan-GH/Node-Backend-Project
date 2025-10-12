const express = require('express')
const userRouter = require('./routers/user.router')
const app = express()
const cookieParser = require('cookie-parser')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/static', express.static('public'))
app.use(cookieParser())


app.set("view engine", "ejs")

app.use("/api/v1/user", userRouter)

module.exports = { app }