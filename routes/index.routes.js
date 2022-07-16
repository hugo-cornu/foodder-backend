const router = require("express").Router()

router.get("/", (req, res, next) => {
  res.json(
    "Welcome to Foodder app. Read the API's documentation: https://documenter.getpostman.com/view/21219252/UzBiPULQ"
  )
})

module.exports = router
