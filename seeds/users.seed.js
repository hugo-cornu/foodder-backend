require("../db/index")
const User = require("../models/User.model")
const bcrypt = require("bcryptjs")

const hashedPass = bcrypt.hashSync("1234", 10)
const users = [
  {
    name: "Bob Harold",
    username: "bobby",
    email: "bob@email.com",
    password: hashedPass,
    image:
      "https://images.generated.photos/1NXNJlEkuUZERLjHd6MDbGBUqwau-p04_khDrT0vJmU/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/NDQyMDkyLmpwZw.jpg",
  },
  {
    name: "Alice Depiotte",
    username: "Alicia",
    email: "alice@email.com",
    password: hashedPass,
    image:
      "https://images.generated.photos/sAkbY6xWz6euNfz97QAQMvPWdl3vJMVM77NVYL7SXTg/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/MjQ1Njk3LmpwZw.jpg",
  },
  {
    name: "John James",
    username: "Johnny",
    email: "john@email.com",
    password: hashedPass,
    image:
      "https://images.generated.photos/FW4dLPOldUykoQkVo7QXjhjtoPFouvziUAHGCfpO6Pg/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/MDUzOTUxLmpwZw.jpg",
  },
  {
    name: "Thibault Cadet",
    username: "Thib",
    email: "thib@email.com",
    password: hashedPass,
    image:
      "https://images.generated.photos/sHOBRsXFeyDqzJJR66O6WZg00NPHcnirCRDQWkM-k1A/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/NTYyMDg0LmpwZw.jpg",
  },
]

const seed = async () => {
  const created = await User.create(users)
  console.log("Created ", created.length)
  process.exit()
}

seed()
