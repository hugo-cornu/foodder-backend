const router = require("express").Router()
const isAuthenticated = require("../middleware/isAuthenticated")
const isAuthor = require("../middleware/isAuthor")
const isPageOwner = require("../middleware/isPageOwner")
const Article = require("../models/Article.model")
const User = require("../models/User.model")

// ------------------ FEED PAGE ------------------ //

// GET ALL PUBLIC POSTS IN THE FEED PAGE
router.get("/", isAuthenticated, async (req, res, next) => {
  try {
    res
      .status(200)
      .json(await Article.find({ private: false }).sort({ createdAt: -1 }))
  } catch (error) {
    next(error)
  }
})

// GET ALL POSTS FILTERED BY COUNTRY
router.get("/countries", isAuthenticated, async (req, res, next) => {
  try {
    const { cca3 } = req.query
    let query = {
      countryCca3: { $in: cca3 },
      private: false,
    }
    res.status(200).json(await Article.find(query))
  } catch (error) {
    next(error)
  }
})

// ------------------ PROFILE PAGE ------------------ //

// GET POST FROM A PROFILE PAGE -> FILTER IF USER != PageOwner (Only private posts)

// router.get("/user/:username", isAuthenticated, async (req, res, next) => {
//   try {
//     const connectedUsername = req.user.username
//     const username = req.params.username

//     const user = await User.findOne({ usename })
//     const userId = user._id

//     // Check if the connected user is the owner of the profile page visited
//     if (connectedUsername === username) {
//       res
//         .status(200)
//         .json(await Article.find({ author: userId }).sort({ createdAt: -1 }))
//     } else {
//       res.status(200).json(
//         await Article.find({ author: userId, private: false }).sort({
//           createdAt: -1,
//         })
//       )
//     }
//   } catch (error) {
//     next(error)
//   }
// })

// GET POSTS FROM USER FILTERED BY COUNTRY

router.get(
  "/user/:username",
  isAuthenticated,
  isPageOwner,
  async (req, res, next) => {
    try {
      const foundUser = await User.findOne({ username: req.params.username })
      const foundUserId = foundUser._id

      if (req.isOwner) {
        res
          .status(200)
          .json(
            await Article.find({ author: foundUserId }).sort({ createdAt: -1 })
          )
      } else {
        res.status(200).json(
          await Article.find({ author: foundUserId, private: false }).sort({
            createdAt: -1,
          })
        )
      }
    } catch (error) {
      next(error)
    }
  }
)

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

module.exports = router
