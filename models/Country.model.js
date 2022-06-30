const { Schema, SchemaTypes, model } = require("mongoose")

const countryModel = new Schema({
  countryName: String,
  countryCca2: {
    type: String,
    maxLength: 2,
  },
})

const Country = model("Country", countryModel)

module.exports = Country
