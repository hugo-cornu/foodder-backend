// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config")

// ℹ️ Connects to the database
require("./db")

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express")

const app = express()

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app)

// 👇 Start handling routes here
// Contrary to the views version, all routes are controlled from the routes/index.js
const allRoutes = require("./routes/index.routes")
app.use("/", allRoutes)

const authRoutes = require("./routes/auth.routes")
app.use("/api/auth", authRoutes)

const articlesRoutes = require("./routes/articles.routes")
app.use("/api/articles", articlesRoutes)

const commentsRoutes = require("./routes/comments.routes")
app.use("/api/", commentsRoutes) // -> routes are define deeply in comments.routes.js

const favoritesRoutes = require("./routes/favorites.routes")
app.use("/api/favorites", favoritesRoutes)

const usersRoutes = require("./routes/users.routes")
app.use("/api/user", usersRoutes)

const resetPasswordRoutes = require("./routes/reset-password.routes")
app.use("/api", resetPasswordRoutes)
// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app)

module.exports = app
