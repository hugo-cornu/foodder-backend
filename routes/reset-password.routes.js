const bcrypt = require("bcryptjs")
const jsonwebtoken = require("jsonwebtoken")
const nodemailer = require("nodemailer")
const User = require("../models/User.model")

const router = require("express").Router()
const saltRounds = 10

// GET - Display a Reset Password Page
router.get("/reset-password", async (req, res, next) => {
  try {
    res
      .status(200)
      .json({ message: "Try to reset your password with your email" })
  } catch (err) {
    next(err)
  }
})

// POST - Check if the user email is in the database in order the send him-her a email with a link
router.post("/reset-password", async (req, res, next) => {
  try {
    const { email } = req.body
    const foundUser = await User.findOne({ email })
    const { username } = foundUser

    // checking if the email already exists in the data base
    if (!foundUser) {
      res
        .status(400)
        .json({ errorMessage: "The email provided does not exist" })
      return
    }

    const resetToken = jsonwebtoken.sign(
      { username, _id },
      process.env.TOKEN_SECRET,
      {
        algorithm: "HS256",
        expiresIn: "5m",
      }
    )

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    })

    const emailMessage = await transporter.sendMail({
      from: `"Foodder App" <foodder.mail@gmail.com>`,
      to: email,
      subject: "Foodder | Reset password",
      text: `Hi! Here is the link to reset your password: http://localhost:${process.env.PORT}/user/reset-password/?token=${resetToken}`,
    })

    console.log("emailMessage:", emailMessage)
    res.status(200).json({ message: "Email sent. Check your mailbox! :)" })
  } catch (err) {
    next(err)
  }
})

// PATCH - Update the password by decoding the Reset Token
router.patch("/user/reset-password", async (req, res, next) => {
  try {
    const { token } = req.query // token found in the mail link
    const { username, password } = req.body
    const foundUser = await User.findOne({ username })

    if (!username) {
      res.status(400).json({
        message: "Please provide your username to update your password",
      })
      return
    }

    if (!foundUser) {
      res.status(400).json({ message: `${username} does not exist` })
      return
    }

    const isPasswordMatched = await bcrypt.compare(password, foundUser.password)
    if (isPasswordMatched) {
      res.status(401).json({
        message:
          "This password was your previous one. You should change it or use it to login.",
      })
      return
    }

    try {
      const decodedJwt = jsonwebtoken.verify(token, process.env.TOKEN_SECRET)

      if (token) {
        const salt = await bcrypt.genSalt(saltRounds)
        const hashedPassword = await bcrypt.hash(password, salt)

        await User.findOneAndUpdate(
          { username: decodedJwt.username },
          { password: hashedPassword }
        )
      }
      res.status(200).json({
        message: `You've successfully updated your password! Please login to continue.`,
      })
    } catch (err) {
      res.json({ message: "Token has expired." })
    }
  } catch (err) {
    next(err)
  }
})

module.exports = router
