const {Schema, SchemaTypes, model} = require("mongoose")

const favoriteSchema = new Schema(
  {
    author: {
      type: SchemaTypes.ObjectId,
      ref: "User",
    },
    article: {
      type: SchemaTypes.ObjectId,
      ref: "Article",
    },
  },
  {
    timestamps: true,
  }
)

const Favorite = model("Favorite", favoriteSchema)

module.exports = Favorite
