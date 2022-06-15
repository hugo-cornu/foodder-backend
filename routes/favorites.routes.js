const router = require("express").Router()
const isAuthenticated = require("../middleware/isAuthenticated")
const Favorite = require("../models/Favorite.model")

// POST - CREATE A FAVORITE
router.post("/", isAuthenticated, async (req, res, next) => {
  try {
    const favToCreate = req.body
    favToCreate.user = req.user._id
    const favCreated = await Favorite.create(favToCreate)
    res.status(201).json(favCreated)
  } catch (error) {
    next(error)
  }
})

// DELETE A FAVORITE
router.delete("/:id", isAuthenticated, async (req, res, next) => {
  const userId = req.user._id.toString()
  const foundFav = await Favorite.findById(req.params.id)
  const favAuthor = foundFav.author.toString()

  if (userId !== favAuthor) {
    res.status(401).json({ message: "You are not the author of the favorite" })
    return
  }

  try {
    await Favorite.findByIdAndDelete(req.params.id)
    res
      .status(200)
      .json({ message: `You deleted the favorite ${req.params.id}` })
  } catch (error) {
    next(error)
  }
})

/* EXPORTS */
module.exports = router
