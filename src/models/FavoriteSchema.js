import mongoose from "mongoose";
const { Schema } = mongoose;

const FavoriteSchema = new Schema({
  word: {
    type: String,
    required: true,
  },
  audio: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Favorite = mongoose.model("Favorite", FavoriteSchema);
