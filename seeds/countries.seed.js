const axios = require("axios")
const Country = require("../models/Country.model")
getCountries()

async function getCountries() {
  const response = await axios.get("https://restcountries.com/v3.1/all")
  // console.log("data:", response.data)
  const allCountries = response.data
  const allCountriesCleaned = allCountries.map((country) => {
    return { countryName: country.name.common, countryCca3: country.cca3 }
  })
  seedCountries(allCountriesCleaned)
}

async function seedCountries(allCountriesCleaned) {
  const newConnection = await require("../db/index.js")
  const createdCountries = await Country.create(allCountriesCleaned)
  await Promise.all(allCountriesCleaned)

  console.log("createdCountries:", createdCountries)
  console.log(`Created ${createdCountries.length} countries.`)
  await mongoose.connection.close()
  console.log("Connection closed.")
}
