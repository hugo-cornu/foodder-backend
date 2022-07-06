const router = require("express").Router()
const isAuthenticated = require("../middleware/isAuthenticated")
const isAuthor = require("../middleware/isAuthor")
const pageOwnership = require("../middleware/pageOwnership")
const fileUploader = require("../config/cloudinary.config")

// IMPORT MODELS
const Article = require("../models/Article.model")
const City = require("../models/City.model")
const Country = require("../models/Country.model")
const User = require("../models/User.model")

// GET ONE USER BY USERNAME

router.get("/:usernameParam", isAuthenticated, async (req, res, next) => {
  try {
    res
      .status(200)
      .json(await User.find({ username: req.params.usernameParam }))
  } catch (error) {
    next(error)
  }
})

module.exports = router
