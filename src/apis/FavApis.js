import { FavoriteWord } from "../models/FavoriteWordSchema";

export const getFavoriteWords = async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const { listID } = req.params;
    const favWords = await FavoriteWord.find({
      FavoriteLists: { $in: [listID] },
    });
    res.json(favWords);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addFavoriteWord = async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const { listID } = req.params;
    const { newWord } = req.body;
    let existWord = await FavoriteWord.findOne({ word: newWord.word });
    if (existWord) {
      //防止重複創建單字，只增加listID
      const updatedWord = await FavoriteWord.findByIdAndUpdate(
        existWord._id,
        { $addToSet: { FavoriteLists: listID } }, // 防止重複加入
        { new: true }
      );
      res.json(updatedWord);
    } else {
      const favWord = await FavoriteWord.create({
        ...newWord,
        FavoriteLists: [listID], //陣列處理方式
      });
      res.json(favWord);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const removeFavoriteWord = async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const { listID, wordID } = req.params;

    // 先找到這個單字
    const favWord = await FavoriteWord.findById(wordID);

    if (!favWord) {
      return res.status(404).json({ message: "Word not found" });
    }

    // 從 FavoriteLists 陣列中刪除該 listID
    await FavoriteWord.findByIdAndUpdate(
      wordID,
      { $pull: { FavoriteLists: listID } },
      { new: true }
    );

    // **再確認這個單字是否還被其他收藏夾使用**
    const updatedWord = await FavoriteWord.findById(wordID);

    if (updatedWord.FavoriteLists.length === 0) {
      // 🗑 如果已經沒有收藏夾使用這個單字，就刪除整個 wordData
      await FavoriteWord.findByIdAndDelete(wordID);
    }

    res.json({ successMsg: "Favorite removed successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
