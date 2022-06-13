const bcrypt = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");
const User = require("../models/User.model");

const router = require("express").Router();
const saltRounds = 10;

/*
  GET /signup
  Show a signup form.
  */
router.get("/signup", async (req, res, next) => {
  res.status(200).json({message: "Signup Page Connected!"})
  
  // const root = __dirname.replace("routes", "");
  // console.log(root);
  // res.sendFile("views/auth/signup.html", { root });
});

/*
  POST /signup
  Create a user
*/
router.post("/signup", async (req, res, next) => {
  try {
    console.log(">>>>>>>>>>", req.body)
    // const userCreated = await User.create(userToCreate)
    // res.status(201).json({message: "User Created", userCreated})
    
    const { username, password} = req.body;
    const foundUser = await User.findOne({ username });
    if (foundUser) {
      res
        .status(401)
        .json({ message: "Username already exists. Try logging in instead." });
      return;
    }

    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    const createdUser = await User.create({
      ...req.body,
      password: hashedPassword,
    });

    res.status(201).json(createdUser);
  
  }  catch (error) {
    console.log(error);
    next(error);
  }
});

/* POST /login
Logging the user into our website
*/
router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  const foundUser = await User.findOne({ username });

  if (!foundUser) {
    res.status(404).json({ message: "username does not exist" });
    return;
  }

  const isPasswordMatched = await bcrypt.compare(password, foundUser.password);
  if (!isPasswordMatched) {
    res.status(401).json({ message: "password does not match" });
    return;
  }

  const payload = {username, name: foundUser.name, _id: foundUser._id };

  const authToken = jsonwebtoken.sign(payload, process.env.TOKEN_SECRET, {
    algorithm: "HS256",
    expiresIn: "15s",
  });

  res.status(200).json({ isLoggedIn: true, authToken });
});

module.exports = router