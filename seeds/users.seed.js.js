//MANUAL SEED
const mongoose = require("mongoose")
const User = require("../models/User.model")

const users = [
  {
    name: "Paul",
    username: "paul",
    email: "paul@fakemail.com",
    password: "paulpaulpaul",
    image:
      "https://images.generated.photos/5B0ov-wywKzKvJf4vaXj9MhyDhO45U8yQJCQGHrq_Yo/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/MTM3MzY2LmpwZw.jpg",
  },
  {
    name: "Jean",
    username: "jean",
    email: "jean@fakemail.com",
    password: "jeanjeanjean",
    image:
      "https://images.generated.photos/1QDbPPteObv46t5YfRlhCeObxzXOK6M05jo8oAk8mUY/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/MzA0NDU0LmpwZw.jpg",
  },
  {
    name: "Jane",
    username: "jane",
    email: "jane@fakemail.com",
    password: "janejanejane",
    image:
      "https://images.generated.photos/lSpgXsNZHmF1DInlsvL73ukIjF86Sg80-CqGdTV883g/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/NDUxNzc5LmpwZw.jpg",
  },
]

async function seedUsers() {
  const newConnection = await require("../db/index.js")
  const createdUsers = await User.create(users)
  console.log(`Created ${createdUsers.length} users.`)
  await mongoose.connection.close()
  console.log("Connection closed.")
}

seedUsers()
