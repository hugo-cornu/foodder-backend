const router = require("express").Router()
const isAuthenticated = require("../middleware/isAuthenticated")
const isAuthor = require("../middleware/isAuthor")
const Article = require("../models/Article.model")

// ------------------ FEED PAGE ------------------ //

// GET ALL PUBLIC POSTS IN THE FEED PAGE
router.get("/", isAuthenticated, async (req, res, next) => {
  try {
    res.status(200).json(await Article.find({ private: false }))
  } catch (error) {
    next(error)
  }
})

// ------------------ PROFILE PAGE ------------------ //

// GET POST FROM A PROFILE PAGE -> FILTER IF USER != PageOwner (Only private posts)

// router.get("/:username", isAuthenticated, async (req, res, next) => {
//   try {
//     username = req.params.username;
//     res.status(200).json(await Article.find({ username }));
//   } catch (error) {
//     next(error);
//   }
// });

// POST - CREATE A NEW POST
router.post("/", isAuthenticated, async (req, res, next) => {
  try {
    req.body.author = req.user._id
    const articleToCreate = req.body
    const articleCreated = await Article.create(articleToCreate)
    res.status(201).json(articleCreated)
  } catch (error) {
    next(error)
  }
})

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

// GET ONE POST (FULL PAGE) WHEN A USER CLICK ON A POST
router.get("/:id", isAuthenticated, async (req, res, next) => {
  try {
    articleId = req.params.id
    res.status(200).json(await Article.findById(articleId))
  } catch (error) {
    next(error)
  }
})

// GET ALL POSTS FILTERED BY ONE COUNTRY
router.get(
  "/countries/:countryCode",
  isAuthenticated,
  async (req, res, next) => {
    try {
      countryCode = req.params.countryCode
      console.log(countryCode)
      res
        .status(200)
        .json(await Article.find({ countryCca3: countryCode, private: false }))
    } catch (error) {
      next(error)
    }
  }
)

module.exports = router
