const router = require("express").Router()
const isAuthenticated = require("../middleware/isAuthenticated")
const Favorite = require("../models/Favorite.model")
const Article = require("../models/Article.model")

// POST CREATE OR DELETE FAVORITE
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

    if (!doesFavExist) {
      // if fav doesn't exist, create new fav
      const favCreated = await Favorite.create(favToCheck)
      res.status(201).json({ "Created favorite": favCreated })
    } else {
      //delete fav if it exists
      const userId = req.user._id.toString()
      const foundFav = await Favorite.findOne({
        article: favToCheckId,
        user: userId,
      })
      const favAuthor = foundFav.user.toString()

      //check if user is author of fav
      if (userId !== favAuthor) {
        res
          .status(401)
          .json({ message: "You are not the author of the favorite" })
        return
      }

      try {
        await Favorite.findByIdAndDelete(foundFav._id)
        res
          .status(200)
          .json({ message: `You deleted the favorite ${foundFav}` })
      } catch (error) {
        next(error)
      }
    }
  } catch (error) {
    next(error)
  }
})

/* EXPORTS */
module.exports = router
