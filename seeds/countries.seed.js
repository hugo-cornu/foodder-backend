const axios = require("axios")
const Country = require("../models/Country.model")
// getCountries()
require("../db/index")
// async function getCountries() {
//   const response = await axios.get("https://restcountries.com/v3.1/all")
//   // console.log("data:", response.data)
//   const allCountries = response.data
//   const allCountriesCleaned = allCountries.map((country) => {
//     return { countryName: country.name.common, countryCca2: country.cca2 }
//   })
//   seedCountries(allCountriesCleaned)
// }

// async function seedCountries(allCountriesCleaned) {
//   const newConnection = await require("../db/index.js")
//   const createdCountries = await Country.create(allCountriesCleaned)

//   console.log("createdCountries:", createdCountries)
//   console.log(`Created ${createdCountries.length} countries.`)
//   await mongoose.connection.close()
//   console.log("Connection closed.")
// }

const countries = [
  {
    countryName: "France",
    countryCca2: "FR",
  },
  {
    countryName: "Belgium",
    countryCca2: "BE",
  },
  {
    countryName: "Italy",
    countryCca2: "IT",
  },
  {
    countryName: "Germany",
    countryCca2: "DE",
  },
  {
    countryName: "Spain",
    countryCca2: "ES",
  },
  {
    countryName: "Vietnam",
    countryCca2: "VN",
  },
  {
    countryName: "England",
    countryCca2: "EN",
  },
  {
    countryName: "Japan",
    countryCca2: "JP",
  },
  {
    countryName: "South Korea",
    countryCca2: "KR",
  },
  {
    countryName: "India",
    countryCca2: "IN",
  },
  {
    countryName: "United States of America",
    countryCca2: "US",
  },
]
;(async function seed() {
  await Country.create(countries)
  process.exit()
})()
