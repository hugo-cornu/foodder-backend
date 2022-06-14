const { Schema, SchemaTypes, model } = require("mongoose")

const countryModel = new Schema({
  countryName: String,
  countryCca3: String,
})

const Country = model("Country", countryModel)

module.exports = Country
