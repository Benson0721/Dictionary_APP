import axios from "axios";
const baseURL = window.location.origin;
export const getFavoriteList = async (userID) => {
  try {
    const res = await axios.get(`${baseURL}/${userID}/lists`);
    return res.data;
  } catch (e) {
    return { error: "Get Favorites Fail!" };
  }
};

export const addFavoriteList = async (userID, newList) => {
  try {
    const res = await axios.post(`${baseURL}/${userID}/lists`, {
      data: newList,
    });
    return { success: "Add Favorite Success!" };
  } catch (e) {
    return { error: "Add Favorite Fail!" };
  }
};

export const deleteFavoriteList = async (userID, listID) => {
  try {
    const res = await axios.delete(`${baseURL}/${userID}/lists/${listID}`);
    return { success: "Delete Favorite Success!" };
  } catch (e) {
    return { error: "Delete Favorite Fail!" };
  }
};

export const updateFavoriteList = async (userID, listID, updatedList) => {
  try {
    const res = await axios.patch(`${baseURL}/${userID}/lists/${listID}`, {
      updateList: updatedList,
    });
    return { success: "Update Favorite Success!" };
  } catch (e) {
    return { error: "Update Favorite Fail!" };
  }
};
