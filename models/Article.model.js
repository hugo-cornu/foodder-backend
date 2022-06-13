const {Schema, SchemaTypes, model} = require("mongoose")

const articleSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
    countryCca3: {
      type: String,
    },
    city: {
      type: String,
    },
    restaurant: {
      type: String,
    },
    private: {
      type: Boolean,
    },
    author: {
      type: SchemaTypes.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
)

const Article = model("Article", articleSchema)

module.exports = Article
