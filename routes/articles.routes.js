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

// ------------------ FEED PAGE ------------------ //

// GET ALL PUBLIC POSTS IN THE FEED PAGE
router.get(
  "/",
  /* isAuthenticated, */ async (req, res, next) => {
    try {
      res
        .status(200)
        .json(  
          await Article.find({ private: false })
            .sort({ createdAt: -1 })
            .populate("author")
        )
    } catch (error) {
      next(error)
    }
  }
)

// GET ALL POSTS FILTERED BY COUNTRY
router.get("/countries", isAuthenticated, async (req, res, next) => {
  try {
    const { cca2 } = req.query
    console.log(">>>req.query:", req.query)

    let query = {
      countryCca2: { $in: cca2 },
      private: false,
    }
    console.log(">>>>>query:", query)
    res.status(200).json(await Article.find(query))
  } catch (error) {
    next(error)
  }
})

// ------------------ PROFILE PAGE ------------------- //

// GET POSTS FROM A PROFILE PAGE -> FILTER IF USER != PageOwner (Only private posts)

router.get("/user/:username", isAuthenticated, async (req, res, next) => {
  try {
    const connectedUsername = req.user.username
    const username = req.params.username

    const user = await User.findOne({ username })
    const userId = user._id

    // Check if the connected user is the owner of the profile page visited
    if (connectedUsername === username) {
      res
        .status(200)
        .json(
          await Article.find({ author: userId })
            .sort({ createdAt: -1 })
            .populate("author", "username")
        )
    } else {
      res
        .status(200)
        .json(
          await Article.find({ author: userId, private: false })
            .sort({ createdAt: -1 })
            .populate("author", "username")
        )
    }
  } catch (error) {
    next(error)
  }
})

// GET POSTS FROM USER FILTERED BY COUNTRY

router.get(
  "/user/:username",
  isAuthenticated,
  pageOwnership,
  async (req, res, next) => {
    try {
      const foundUser = await User.findOne({ username: req.params.username })
      const foundUserId = foundUser._id

      const { cca2 } = req.query
      console.log("cca2:", cca2)

      if (req.isPageOwner) {
        res.status(200).json(
          await Article.find({
            countryCca2: { $in: CanvasRenderingContext2D },
            author: foundUserId,
          })
            .sort({ createdAt: -1 })
            .populate("author", "username")
        )
      } else {
        res.status(200).json(
          await Article.find({
            countryCca2: { $in: countryCca2 },
            author: foundUserId,
            private: false,
          })
            .sort({
              createdAt: -1,
            })
            .populate("author", "username")
        )
      }
    } catch (error) {
      next(error)
    }
  }
)

// POST - CREATE A NEW POST

router.post(
  "/",
  isAuthenticated,
  fileUploader.single("image"),
  async (req, res, next) => {
    try {
      // Add the image URL to the body request
      if (req.file) {
        req.body.image = req.file.path
      }

      const { title, image } = req.body
      if (!title || !image) {
        res.status(400).json({
          errorMessage: "Please provide a title and an image.",
        })
        return
      }
      // Add the userId to the body request
      req.body.author = req.user._id
      const articleToCreate = req.body

      countryInput = req.body.country
      cca2Input = req.body.cca2
      cityInput = req.body.city

      // Find if a country is already in the DB -> Update/Insert
      const countryCreated = await Country.findOneAndUpdate(
        { countryCca2: cca2Input },
        { countryName: countryInput, countryCca2: cca2Input },
        { upsert: true, new: true }
      )

      // Find if a city is already in the DB -> Update/Insert
      const cityCreated = await City.findOneAndUpdate(
        { cityName: cityInput },
        {
          cityName: cityInput,
          country: countryCreated.id,
        },
        { upsert: true, new: true }
      )

      // Create the user post
      const articleCreated = await Article.create({
        ...articleToCreate,
        city: cityCreated.id,
      })
      res
        .status(200)
        .json({ message: `Good job, you created ${articleCreated}` })
      console.log("articleCreated:", articleCreated)
    } catch (error) {
      next(error)
    }
  }
)

// PATCH - UPDATE A POST BY ID IF AUTHORIZED
router.patch("/:id", isAuthenticated, isAuthor, async (req, res, next) => {
  try {
    await Article.findByIdAndUpdate(req.params.id, req.body)
    res.status(200).json({ message: `Good job, you updated ${req.params.id}` })
  } catch (error) {
    next(error)
  }
})

// DELETE A POST BY ID IF AUTHORIZED
router.delete("/:id", isAuthenticated, isAuthor, async (req, res, next) => {
  try {
    await Article.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: `Good job, you deleted ${req.params.id}` })
  } catch (error) {
    next(error)
  }
})

// ------------------ GENERAL BEHAVIOUR ------------------ //

// GET ONE POST (FULL PAGE) WHEN A USER CLICKS ON A POST
router.get("/:id", isAuthenticated, async (req, res, next) => {
  try {
    articleId = req.params.id
    res.status(200).json(await Article.findById(articleId))
  } catch (error) {
    next(error)
  }
})

module.exports = router
