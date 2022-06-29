const { Schema, SchemaTypes, model } = require("mongoose")

const commentSchema = new Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    user: {
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

const Comment = model("Comment", commentSchema)

module.exports = Comment
