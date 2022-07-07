const User = require("../models/User.model")
const Country = require("../models/Country.model")
const City = require("../models/City.model")
const Article = require("../models/Article.model")
require("../db/index")
const drop = async () => {
  await User.deleteMany()
  await Country.deleteMany()
  await City.deleteMany()
  await Article.deleteMany()
  process.exit()
}

drop()
