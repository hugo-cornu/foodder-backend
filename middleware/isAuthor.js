const jsonwebtoken = require("jsonwebtoken")
const Article = require("../models/Article.model")
const User = require("../models/User.model")

// get the article from the req
// then get the author
// then compare the author id to user id from the req
// Object Ids must be converted to string to be compared

const isAuthor = async (req, res, next) => {
  const userId = req.user._id.toString()

  const foundArticle = await Article.findById(req.params.id)

  const articleAuthor = foundArticle.author.toString()

  if (userId !== articleAuthor) {
    res.status(401).json({ message: "You are not the author" })
    return
  }

  next()
}

module.exports = isAuthor
