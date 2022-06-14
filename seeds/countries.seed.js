const axios = require("axios")
seedCountries()

async function seedCountries() {
  const response = await axios.get("https://restcountries.com/v3.1/all")
  console.log("data:", response.data)
  return response.data
  console.log("response:", response)
}

// const newList = res.map((element) => {
//   element
