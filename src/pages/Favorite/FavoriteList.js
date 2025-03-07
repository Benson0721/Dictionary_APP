import axios from "axios";
const baseURL = window.location.origin;
export const getFavoriteLists = async (userID) => {
  try {
    const res = await axios.get(`${baseURL}/api/${userID}/lists`);
    return res.data;
  } catch (e) {
    return { error: "Get Favorites Fail!" };
  }
};

export const addFavoriteList = async (userID, newList) => {
  try {
    const res = await axios.post(`${baseURL}/api/${userID}/lists`, {
      data: newList,
    });
    return res.data;
  } catch (e) {
    return { error: "Add Favorite Fail!" };
  }
};

export const deleteFavoriteList = async (userID, listID) => {
  try {
    const res = await axios.delete(`${baseURL}/api/${userID}/lists/${listID}`);
    return { success: "Delete Favorite Success!" };
  } catch (e) {
    return { error: "Delete Favorite Fail!" };
  }
};

export const updateFavoriteLists = async (userID, updatedLists) => {
  //可是用於一筆或大量更新
  console.log("前端api start update:", updatedLists);
  try {
    const res = await axios.patch(
      `${baseURL}/api/${userID}/lists`,
      {
        listUpdates: updatedLists.map((list) => ({
          listId: list._id,
          icon: list.icon, // 你要更新的字段
          name: list.name,
        })),
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("前端回收:", res.data.lists);
    return res.data.lists;
  } catch (e) {
    return { error: "Update Lists Fail!" };
  }
};
