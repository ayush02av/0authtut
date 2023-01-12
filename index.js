const express = require("express")
const { auth } = require('express-openid-connect')
require('dotenv').config()

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.secret,
    baseURL: process.env.baseURL,
    clientID: process.env.clientID,
    issuerBaseURL: process.env.issuerBaseURL,
}

const app = express()

app.set("views", "views")
app.set("view engine", "ejs")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))
app.use(auth(config))

// app.use("/", indexRouter)
app.get('/', function (req, res) {
    res.render('home', { oidc: req.oidc })
})

app.listen(80, () => {
    console.log("express is running on port http://localhost:80")
})