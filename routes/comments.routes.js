const router = require("express").Router()
const isAuthenticated = require("../middleware/isAuthenticated")
const Comment = require("../models/Comment.model")

// GET ALL COMMENTS FROM A POST PAGE
router.get(
  "/articles/:articleId/comments",
  isAuthenticated,
  async (req, res, next) => {
    try {
      const articleId = req.params.articleId
      console.log("articleId:", articleId)
      res.status(200).json(
        await Comment.find({
          article: articleId,
        })
      )
    } catch (error) {
      next(error)
    }
  }
)

// POST A NEW COMMENT
router.post(
  "/articles/:articleId/comments",
  isAuthenticated,
  async (req, res, next) => {
    try {
      // Get user comment description
      const commentToCreate = req.body
      console.log("commentToCreate:", commentToCreate)

      // Append userId to the body request
      commentToCreate.user = req.user._id

      // Append articleId to the body request
      commentToCreate.article = req.params.articleId

      const commentCreated = await Comment.create(commentToCreate)
      res.status(201).json({ "Created comment": commentCreated })
    } catch (error) {
      next(error)
    }
  }
)

// UPDATE A COMMENT
router.patch(
  "/articles/:articleId/comments/:commentId",
  isAuthenticated,
  async (req, res, next) => {
    try {
      // Get user comment description
      const commentToUpdate = req.body

      const commentCreated = await Comment.findByIdAndUpdate(
        req.params.commentId,
        commentToUpdate
      )
      res
        .status(200)
        .json({ message: `Good job, you updated ${req.params.commentId}` })
    } catch (error) {
      next(error)
    }
  }
)

// DELETE A COMMENT
router.delete(
  "/articles/:articleId/comments/:commentId",
  isAuthenticated,
  async (req, res, next) => {
    try {
      const commentCreated = await Comment.findByIdAndDelete(
        req.params.commentId
      )
      res
        .status(200)
        .json({ message: `Good job, you deleted ${req.params.commentId}` })
    } catch (error) {
      next(error)
    }
  }
)

module.exports = router
