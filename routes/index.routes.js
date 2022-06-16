const router = require("express").Router()

router.get("/", (req, res, next) => {
  res.sendFile("views/main.html", { root: require("../root") })
})

// router.get("/", (req, res, next) => {
//   res.json(
//     "Welcome to Foodder app. Read the API's documentation: https://documenter.getpostman.com/view/21219252/UzBiPULQ"
//   )
// })

// You put the next routes here 👇
// example: router.use("/auth", authRoutes)

module.exports = router
