const router = require("express").Router()
const isAuthenticated = require("../middleware/isAuthenticated")
const pageOwnership = require("../middleware/pageOwnership")
const Favorite = require("../models/Favorite.model")
const User = require("../models/User.model")

// GET - GET ALL FAVORITES BY LOGGEDIN USER

router.get(
  "/:username",
  isAuthenticated,
  pageOwnership,
  async (req, res, next) => {
    try {
      const foundUser = await User.findOne({ username: req.params.username })
      const foundUserId = foundUser._id

      if (req.isPageOwner) {
        res.status(200).json(
          await Favorite.find({
            author: foundUserId,
          }).populate("article")
        )
      } else {
        res
          .status(401)
          .json({ message: "You are not the author of the favorites" })
      }
    } catch (error) {
      next(error)
    }
  }
)

// POST - CREATE A FAVORITE
router.post("/", isAuthenticated, async (req, res, next) => {
  try {
    const favToCheck = req.body
    favToCheck.user = req.user._id

    // get ID of article to check
    const favToCheckId = req.body.article

    // get all likes by user
    const allFavOfUser = await Favorite.find({ user: req.user._id }).select(
      "article"
    )

    // return array of  strings of  articles' IDs liked by user
    const allFavOfUserIds = await allFavOfUser.map((item) => {
      return item.article.toString()
    })

    // check if new fav is included
    const doesFavExist = allFavOfUserIds.includes(favToCheckId.toString())

    if (doesFavExist) {
      // if fav exists, return
      res.status(400).json({ message: "Favorite already exists" })
      return
    } else {
      // if fav doesn't exist, create new fav
      const favCreated = await Favorite.create(favToCheck)
      res.status(201).json({ "Created favorite": favCreated })
    }
  } catch (error) {
    next(error)
  }
})

// DELETE A FAVORITE
router.delete("/", isAuthenticated, async (req, res, next) => {
  const userId = req.user._id.toString()
  console.log("userId:", userId)
  console.log("req:", req.body)
  const favToCheckId = req.body.article
  console.log("favToCheckId:", favToCheckId)
  const foundFav = await Favorite.findOne({
    article: favToCheckId,
    user: userId,
  })
  console.log("foundFav:", foundFav)

  //check if fav exists
  if (!foundFav) {
    res.status(404).json({ message: "Favorite not found" })
    return
  } else if (foundFav) {
    const favAuthor = foundFav.user.toString()
  }

  //check if user is author of fav
  else if (userId !== favAuthor) {
    res.status(401).json({ message: "You are not the author of the favorite" })
    return
  }

  try {
    await Favorite.findByIdAndDelete(foundFav._id)
    res.status(200).json({ message: `You deleted the favorite ${foundFav}` })
  } catch (error) {
    next(error)
  }
})

/* EXPORTS */
module.exports = router
