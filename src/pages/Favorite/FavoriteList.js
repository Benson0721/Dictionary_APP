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

export const updateFavoriteList = async (userID, listID, updatedList) => {
  try {
    const res = await axios.patch(`${baseURL}/api/${userID}/lists/${listID}`, {
      updateList: updatedList,
    });
    return res.data;
  } catch (e) {
    return { error: "Update Favorite Fail!" };
  }
};
