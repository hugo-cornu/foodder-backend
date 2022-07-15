const bcrypt = require("bcryptjs")
const jsonwebtoken = require("jsonwebtoken")
const User = require("../models/User.model")
const root = require("../root")
const fileUploader = require("../config/cloudinary.config")
const router = require("express").Router()
const saltRounds = 10
const nodemailer = require("nodemailer")

// /*
//   GET /signup
//   Show a signup form.
//   */
// router.get("/signup", async (req, res, next) => {
//   res.sendFile("views/auth/signup.html", { root })
// })

// /*
//   GET /login
//   Show a login form.
//   */
// router.get("/login", async (req, res, next) => {
//   res.sendFile("views/auth/login.html", { root: require("../root") })
// })

/*
  POST /signup
  Create a user
*/
router.post("/signup", fileUploader.single("image"), async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = req.file.path
    }
    const { name, username, email, password } = req.body
    const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/
    const regexEmail = /^\S+@\S+\.\S+$/

    // Make sure users fill all mandatory fields
    if (!username || !email || !password) {
      res.status(400).json({
        errorMessage:
          "All fields are mandatory. Please provide your username, email and password.",
      })
      return
    }

    // Make sure password is strong
    if (!regex.test(password)) {
      res.status(400).json({
        errorMessage:
          "Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.",
      })
      return
    }

    // Make sure email is vavlid
    if (!regexEmail.test(email)) {
      res.status(400).json({
        errorMessage: "Email is not a valid email address.",
      })
      return
    }

    // Check if the username is already taken
    const foundUser = await User.findOne({
      $or: [{ username: username }, { email: email }],
    })

    console.log("foundUser:", foundUser)

    if (foundUser) {
      res.status(401).json({
        errorMessage:
          "Username or email already exist. Try logging in instead.",
      })
      return
    }

    const salt = await bcrypt.genSalt(saltRounds)
    const hashedPassword = await bcrypt.hash(password, salt)

    const createdUser = await User.create({
      ...req.body,
      password: hashedPassword,
    })

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    })

    const emailMessage = await transporter.sendMail({
      from: '"Hugo Cornu " <cornu.hugo.@gmail.com>',
      to: email,
      subject: "Welcome to Foodder!",
      text: `Hi ${name}! Welcome to FOODDER!`,
    })

    res.status(201).json(createdUser)
  } catch (error) {
    console.log(error)
    next(error)
  }
})

/* POST /login
Logging the user into our website
*/
router.post("/login", async (req, res, next) => {
  const { username, password } = req.body
  const foundUser = await User.findOne({ username })
  console.log("foundUser:", foundUser)

  if (!foundUser) {
    res.status(400).json({ message: "username does not exist" })
    return
  }

  const isPasswordMatched = await bcrypt.compare(password, foundUser.password)
  if (!isPasswordMatched) {
    res.status(401).json({ message: "password does not match" })
    return
  }

  const payload = {
    username,
    name: foundUser.name,
    _id: foundUser._id,
    image: foundUser.image,
  }

  const authToken = jsonwebtoken.sign(payload, process.env.TOKEN_SECRET, {
    algorithm: "HS256",
    expiresIn: "1h",
  })

  res.status(200).json({ isLoggedIn: true, authToken })
})

router.get("/verify", async (req, res, next) => {
  // Verify the bearer token is still valid
  // get the bearer token from the header
  const { authorization } = req.headers

  // isolate the jwt
  const token = authorization.replace("Bearer ", "")
  console.log({ token })

  try {
    // verify the jwt with the jsonwebtoken package
    const payload = jsonwebtoken.verify(token, process.env.TOKEN_SECRET)
    console.log({ payload })

    // send the user the payload
    res.json({ token, payload })
  } catch (error) {
    console.error(error)
    res.status(400).json({ message: "Invalid token" })
  }
})

module.exports = router
