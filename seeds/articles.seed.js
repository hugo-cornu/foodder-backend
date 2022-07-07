//MANUAL SEED
const mongoose = require("mongoose")
const User = require("../models/User.model")
const Article = require("../models/Article.model")
const City = require("../models/City.model")

require("../db/index.js")

const articles = [
  {
    title: "Eggs Benedict",
    description: "Incredible!",
    image:
      "https://tastesbetterfromscratch.com/wp-content/uploads/2013/08/Eggs-Benedict-11-300x300.jpg",
    countryCca2: "FR",
    city: "Paris",
    restaurant: "Bouillon",
    private: true,
  },
  {
    title: "Escargots au beurre persillé",
    description:
      "Première fois que je goûte des escargots à l'ail. Disons que j'y allais un peu à reculons. Au final, c'est vraiment excellent !",
    image:
      "https://d36qbsb0kq4ix7.cloudfront.net/images/mmc/escargot-beurre-persille.jpg",
    countryCca2: "FR",
    city: "Paris",
    restaurant: "Chez Fernand Christine",
    private: false,
  },
  {
    title: "Magret de canard & champignons",
    description:
      "Un classiques de la cuisine du sud-ouest et française en général.",
    image:
      "https://www.epicurien.be/magazine/00-img-epicurien/recettes-w800/magret-de-canard-grille-four.jpg",
    countryCca2: "FR",
    city: "Paris",
    private: false,
  },
  {
    title: "ho Bò, la soupe vietnamienne",
    description:
      "Soupe phở est une recette traditionnelle de cuisine vietnamienne, à base de bouillon de viande et de nouilles de riz, agrémentés de divers ingrédients. D'ailleurs, je ne savais pas mais : Le nom phở ou pho viendrait probablement du mot français pot-au-feu en rapport avec l'époque de l'Indochine.",
    image:
      "https://authentikvietnam.com/media/blog/recette-pho-bo-nouilles-boeuf.jpg",
    countryCca2: "VN",
    city: "Hanoi",
    private: false,
  },
  {
    title: "Tortilla espagnole",
    description:
      "Institution en Espagne et je comprends pourquoi ! Avec oignons ou sans, à la truffe, au chorzo... on en a pour tous les goûts. Magnifique 👀",
    image:
      "https://media-cdn.tripadvisor.com/media/photo-s/0d/f8/c5/89/20161226-134437-largejpg.jpg",
    countryCca2: "ES",
    city: "Madrid",
    private: false,
  },
  {
    title: "Barbecue coréen à Séoul !",
    description:
      "Vraiment délicieux ! La viande, les légumes... tout ! et quelle ambiance. Ça me rend vraiment nostalgique rien que d'y repenser.",
    image:
      "https://fastly.4sqi.net/img/general/600x600/9852498_sB1rVNAYL4Zy81OWrsupCp12FFNe555e6AvWJiRd77U.jpg",
    countryCca2: "KR",
    city: "Seoul",
    private: false,
  },
  {
    title: "Célèbre pizza napolitaine 😋",
    description:
      "D'abord déçu puisque la pizzeria la plus réputée a fermé à cause d'une explosion... mais finalement pas deçu ! La pizza de Naples n'est pas un mythe !",
    image:
      "https://media-cdn.tripadvisor.com/media/photo-s/18/03/98/d6/received-665664433902722.jpg",
    countryCca2: "IT",
    city: "Napoli",
    private: false,
  },
  {
    title: "Pasta alla Carbonara - Les vraies ! ",
    description: `Ça y est. J'arrête de mettre de la crème dans mes carbo ahah ! Je n'ai jamais été très fan de prendre des pâtes au restau... mais j'avoue que cette fois-ci, c'était incroyablement bon. L'art à l'italienne dans toute sa splendeur.
      Adresse : La Taverna dei Monti`,
    image:
      "https://www.partir-a-rome.com/wp-content/uploads/2021/10/pates-taverna-dei-monti.jpeg",
    countryCca2: "IT",
    city: "Roma",
    private: false,
  },
  {
    title: "Poulet Tikka (restau luxe)",
    description:
      "Excellent poulet Tikka dans le restaurant de notre hotel. On voulait tester ça en street mais nous n'avions pas le temps et les premiers que nous avons vu ne présentait pas une hygiène qui inspirait confiance...",
    image:
      "https://www.magazine-mint.fr/wp-content/uploads/2021/09/jugaad-joann-pai-7.jpg",
    countryCca2: "IN",
    city: "New Delhi",
    private: false,
  },
  {
    title: "Boeuf de Kobe 🤯",
    description:
      "Aie aie aiee. Une dinguerie ! Non vraiment. On ne s'y attend vraiment pas croyez-moi... Moi qui mange moins de viande pour des raisons environnementales... Je ne peux pas me mentir : c'est tout de même délicioso :)",
    image:
      "https://www.kanpai.fr/sites/default/files/uploads/2019/02/matsukiya-restaurant-otsu-5.jpg",
    countryCca2: "JP",
    city: "Tokyo",
    private: false,
  },
  {
    title: "King Crab Legs",
    description:
      "Petit dejeuné typique d'Alaska qui fait plaisir en tant que bon breton eheh. Du crabe pour bien commencer la journée ! Et pour bien connaître le produit : c'est quelque chose ! :) Quelle expérience...",
    image:
      "https://cdn.shopify.com/s/files/1/2113/5975/products/399A7288_800x.jpg?v=1569013739",
    countryCca2: "US",
    city: "Ketchikan",
    private: false,
  },
]

async function seedArticles() {
  const allUsers = await User.find()
  const allCities = await City.find()
  const createdArticles = await Article.create(
    await Promise.all(
      articles.map(async (article) => ({
        ...article,
        author: allUsers[Math.floor(Math.random() * allUsers.length)]._id,
        city: allCities.find((el) => article.city === el.cityName),
      }))
    )
  )
  console.log("createdArticles:", createdArticles)
  console.log(`Created ${createdArticles.length} articles.`)
  await mongoose.connection.close()
  console.log("Connection closed.")
  process.exit()
}

seedArticles()
