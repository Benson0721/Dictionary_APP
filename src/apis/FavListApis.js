import { FavoriteLists } from "../models/FavoriteListSchema.js";
import { FavoriteWord } from "../models/FavoriteWordSchema.js";

export const getFavoriteLists = async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const { userID } = req.params;
    const favLists = await FavoriteLists.find({ user: userID });

    res.json({ favLists });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addFavoriteList = async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const { userID } = req.params;
  const { data } = req.body;

  try {
    console.log("後端觸發");
    console.log(userID);
    console.log(data);
    const newList = await FavoriteLists.create({ ...data, user: userID });
    res.json(newList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const updateFavoriteLists = async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { listUpdates } = req.body;

  console.log("後端更新收到:", listUpdates);
  if (!Array.isArray(listUpdates) || listUpdates.length === 0) {
    return res
      .status(400)
      .json({ success: false, error: "Invalid data format" });
  }

  const bulkOps = listUpdates.map((update) => ({
    updateOne: {
      filter: { _id: update.listId },
      update: { $set: { icon: update.icon, name: update.name } }, // 直接回傳lists處理單筆或多筆更新
    },
  }));
  try {
    await FavoriteLists.bulkWrite(bulkOps);

    // ✅ 批次更新後，直接回傳最新的 lists
    const updatedLists = await FavoriteLists.find({});
    return res.json({ success: true, lists: updatedLists });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const deleteFavoriteList = async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const { listID } = req.params;
  try {
    const deleteList = await FavoriteLists.findByIdAndDelete(listID);
    res.json({ success: "delete list complate" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
