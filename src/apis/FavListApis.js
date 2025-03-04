import { FavoriteLists } from "../models/FavoriteListSchema";

export const getFavoriteLists = async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const { userID } = req.params;
    const favLists = await FavoriteLists.find({ userID: userID });
    res.json(favLists);
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
    const newList = await FavoriteLists.create({ ...data, user: userID });
    res.json(newList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const updateFavoriteList = async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const { listID } = req.params;
  const { updatedList } = req.body;
  try {
    const List = await FavoriteLists.findByIdAndUpdate(listID, updatedList, {
      new: true, //回傳更新過的資料
    });
    res.json(List);
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
