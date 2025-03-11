import axios from "axios";
const baseURL = window.location.origin;
export const getFavoriteWords = async (userID, listID) => {
  try {
    const res = await axios.get(`${baseURL}/api/${userID}/lists/${listID}`);
    return res.data;
  } catch (e) {
    return { error: "Get Favorite words Fail!" };
  }
};

export const getAllFavoriteWords = async (userID) => {
  try {
    const res = await axios.get(`${baseURL}/api/${userID}`);
    return res.data;
  } catch (e) {
    return { error: "Get Favorite words Fail!" };
  }
};

export const addFavoriteWord = async (userID, listID, newWord) => {
  try {
    const res = await axios.post(
      `${baseURL}/api/${userID}/lists/${listID}/favorites`,
      {
        newWord: newWord,
      }
    );
    return { success: "Add Favorite Success!" };
  } catch (e) {
    return { error: "Add Favorite Fail!" };
  }
};

export const removeFavoriteWord = async (userID, listID, wordID) => {
  try {
    const res = await axios.delete(
      `${baseURL}/api/${userID}/lists/${listID}/favorites/${wordID}`
    );
    return { success: "Delete Favorite Success!" };
  } catch (e) {
    return { error: "Delete Favorite Fail!" };
  }
};
