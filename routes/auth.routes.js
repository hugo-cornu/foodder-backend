const bcrypt = require("bcryptjs")
const jsonwebtoken = require("jsonwebtoken")
const User = require("../models/User.model")

const router = require("express").Router()
const saltRounds = 10

/*
  GET /signup
  Show a signup form.
  */
router.get("/signup", async (req, res, next) => {
  res.status(200).json({ message: "Signup Page Connected!" })

  // const root = __dirname.replace("routes", "");
  // console.log(root);
  // res.sendFile("views/auth/signup.html", { root });
})

/*
  POST /signup
  Create a user
*/
router.post("/signup", async (req, res, next) => {
  try {
    const { username, email, password } = req.body
    const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/

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

  if (!foundUser) {
    res.status(404).json({ message: "username does not exist" })
    return
  }

  const isPasswordMatched = await bcrypt.compare(password, foundUser.password)
  if (!isPasswordMatched) {
    res.status(401).json({ message: "password does not match" })
    return
  }

  const payload = { username, name: foundUser.name, _id: foundUser._id }

  const authToken = jsonwebtoken.sign(payload, process.env.TOKEN_SECRET, {
    algorithm: "HS256",
    expiresIn: "5m",
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
