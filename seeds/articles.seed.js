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
    countryCca3: "FRA",
    city: "Paris",
    restaurant: "Bouillon",
    private: true,
    author: "paul",
  },
  {
    title: "Escargots au beurre persillé",
    description:
      "Première fois que je goûte des escargots à l'ail. Disons que j'y allais un peu à reculons. Au final, c'est vraiment excellent !",
    image:
      "https://tastesbetterfromscratch.com/wp-content/uploads/2013/08/Eggs-Benedict-11-300x300.jpg",
    countryCca3: "FRA",
    city: "Paris",
    restaurant: "Chez Fernand Christine",
    private: false,
    author: "jane",
  },
  {
    title: "Magret de canard & champignons",
    description:
      "Un classiques de la cuisine du sud-ouest et française en général.",
    image:
      "https://tastesbetterfromscratch.com/wp-content/uploads/2013/08/Eggs-Benedict-11-300x300.jpg",
    countryCca3: "FRA",
    city: "Paris",
    private: false,
    author: "jane",
  },
  {
    title: "ho Bò, la soupe vietnamienne",
    description:
      "Soupe phở est une recette traditionnelle de cuisine vietnamienne, à base de bouillon de viande et de nouilles de riz, agrémentés de divers ingrédients. D'ailleurs, je ne savais pas mais : Le nom phở ou pho viendrait probablement du mot français pot-au-feu en rapport avec l'époque de l'Indochine.",
    image:
      "https://tastesbetterfromscratch.com/wp-content/uploads/2013/08/Eggs-Benedict-11-300x300.jpg",
    countryCca3: "VNM",
    city: "Hanoi",
    private: false,
    author: "jean",
  },
]

async function seedArticles() {
  const newConnection = await require("../db/index.js")
  const createdArticles = await Article.create(
    await Promise.all(
      articles.map(async (article) => ({
        ...article,
        author: await User.findOne({username: article.author}),
      }))
    )
  )
  console.log("createdArticles:", createdArticles)
  console.log(`Created ${createdArticles.length} articles.`)
  await mongoose.connection.close()
  console.log("Connection closed.")
}

seedArticles()
