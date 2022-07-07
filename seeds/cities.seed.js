require("../db/index")
const City = require("../models/City.model")
const Country = require("../models/Country.model")
const cities = [
  {
    cityName: "Paris",
    lat: 48.866667,
    lng: 2.333333,
    country: "FR",
  },
  {
    cityName: "Madrid",
    lat: 40.4167047,
    lng: -3.7035825,
    country: "ES",
  },
  {
    cityName: "Milan",
    lat: 45.4641943,
    lng: 9.1896346,
    country: "IT",
  },
  {
    cityName: "Roma",
    lat: 41.8933203,
    lng: 12.4829321,
    country: "IT",
  },
  {
    cityName: "London",
    lat: 51.5073219,
    lng: -0.1276474,
    country: "EN",
  },
  {
    cityName: "Berlin",
    lat: 52.5170365,
    lng: 13.3888599,
    country: "DE",
  },
  {
    cityName: "Brussels",
    lat: 50.8465573,
    lng: 4.351697,
    country: "BE",
  },
  {
    cityName: "Seoul",
    lat: 37.5666791,
    lng: 126.9782914,
    country: "KR",
  },
  {
    cityName: "Napoli",
    lat: 40.8358846,
    lng: 14.2487679,
    country: "IT",
  },
  {
    cityName: "Tokyo",
    lat: 35.6828387,
    lng: 139.7594549,
    country: "JP",
  },
  {
    cityName: "Ketchikan",
    lat: 55.3430696,
    lng: -131.6466819,
    country: "US",
  },
  {
    cityName: "New Delhi",
    lat: 28.6138954,
    lng: 77.2090057,
    country: "IN",
  },
  {
    cityName: "Hanoi",
    lat: 21.0294498,
    lng: 105.8544441,
    country: "VN",
  },
  {
    cityName: "Concarneau",
    lat: 47.87254000000007,
    lng: -3.9176899999999364,
    country: "FR",
  },
  {
    cityName: "Oldham",
    lat: 53.54217851200008,
    lng: -2.11595688999995,
    country: "EN",
  },
  {
    cityName: "Granada",
    lat: 12.151965053000026,
    lng: -61.659644958999934,
    country: "ES",
  },
]

seed()
async function seed() {
  const allPromises = await Promise.all(
    cities.map(async (city) => {
      const country = await Country.findOne({ countryCca2: city.country })
      // city.countryCca2 = country._id
      // console.log(country)
      return {
        cityName: city.cityName,
        lat: city.lat,
        lng: city.lng,
        country: country._id,
      }
    })
  )
  console.log(allPromises)
  const city = await City.create(allPromises)

  console.log(city)
  process.exit()
}
