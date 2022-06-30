const { Schema, SchemaTypes, model } = require("mongoose")

const cityModel = new Schema({
  cityName: String,
  country: {
    type: SchemaTypes.ObjectId,
    ref: "Country",
  }
})

const City = model("City", cityModel)

module.exports = City
