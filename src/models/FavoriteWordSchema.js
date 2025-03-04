import mongoose from "mongoose";
const { Schema } = mongoose;

const FavoriteWordSchema = new Schema({
  word: {
    type: String,
    required: true,
  },
  audio: {
    type: String,
    required: true,
  },
  favoriteLists: [
    {
      type: mongoose.Types.ObjectId,
      ref: "FavoriteLists",
    },
  ],
});

export const FavoriteWord = mongoose.model("FavoriteWord", FavoriteWordSchema);
