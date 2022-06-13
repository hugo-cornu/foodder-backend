//MANUAL SEED
const mongoose = require("mongoose")
const User = require("../models/User.model")
const Article = require("../models/Article.model")

const articles = [
  {
    title: "Eggs Benedict",
    description: "Incredible!",
    image:
      "https://tastesbetterfromscratch.com/wp-content/uploads/2013/08/Eggs-Benedict-11-300x300.jpg",
    countryIso: "FRA",
    city: "Paris",
    restaurant: "Bouillon",
    private: true,
    author: "",
    authorUsername: "paul",
  },
]

async function seedArticles() {
  const newConnection = await require("../db/index.js")
  const createdArticles = await Article.create(
    articles.map((article) => ({
      ...article,
      author: User.findOne({username: article.author_username}),
    }))
  )
  console.log(`Created ${createdArticles.length} articles.`)
  await mongoose.connection.close()
  console.log("Connection closed.")
}

seedArticles()

// foundUser: User.findbyusername({usernameOfUser: article.username})
// userId: foundUser._id

// async function seedArticles() {
//   const newConnection = await require("../db/index.js")
//   const createdUsers = await User.create(
//     users.map((user) => ({
//       ...user,
//       homeCountry: lookupCountryId(user.homeCca3),
//     }))
//   )
//   console.log(`Created ${createdUsers.length} users.`)
//   await mongoose.connection.close()
//   console.log("Connection closed.")
// }
