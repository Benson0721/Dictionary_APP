import axios from "axios";
const baseURL = window.location.origin;
export const getFavorite = async (userID, listID) => {
  try {
    const res = await axios.get(`${baseURL}/${userID}/lists/${listID}`);
    return res.data;
  } catch (e) {
    return { error: "Get Favorite words Fail!" };
  }
};

export const addFavorite = async (userID, listID, newWord) => {
  try {
    const res = await axios.post(
      `${baseURL}/${userID}/lists/${listID}/favorite`,
      {
        newWord: newWord,
      }
    );
    return { success: "Add Favorite Success!" };
  } catch (e) {
    return { error: "Add Favorite Fail!" };
  }
};

export const removeFavorite = async (userID, listID, wordID) => {
  try {
    const res = await axios.delete(
      `${baseURL}/${userID}/lists/${listID}/favorite/${wordID}`
    );
    return { success: "Delete Favorite Success!" };
  } catch (e) {
    return { error: "Delete Favorite Fail!" };
  }
};
