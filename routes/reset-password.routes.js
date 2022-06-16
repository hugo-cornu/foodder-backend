const bcrypt = require("bcryptjs")
const jsonwebtoken = require("jsonwebtoken")
const User = require("../models/User.model")

const router = require("express").Router()
const saltRounds = 10

// GET - Display a Reset Password Page
router.get("/reset-password", async (req, res, next) => {
  res
    .status(200)
    .json({ message: "Try to reset your password with your email" })
})

// POST - Check if the user email is in the database in order the send him-her a email with a link
router.post("/reset-password", async (req, res, next) => {
  const { email } = req.body
  const foundUser = await User.findOne({ email })

  // checking if the email already exists in the data base
  if (!foundUser) {
    res.status(400).json({ errorMessage: "The email provided does not exist" })
    return
  }

  const resetToken = jsonwebtoken.sign({ username }, process.env.TOKEN_SECRET, {
    algorithm: "HS256",
    expiresIn: "5m",
  })

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  })

  const emailMessage = transporter.sendMail({
    from: '"Hugo Cornu " <cornu.hugo.@gmail.com>',
    to: email,
    subject: "Foodder | Reset password",
    text: `Hi! Here is the link to reset your password: http://localhost:${PORT}/user/reset-password/?token=${token}`,
  })

  console.log("emailMessage:", emailMessage)
})

// PATCH - Update the password by decoding the Reset Token
