import axios from "axios";

const baseURL = window.location.origin;

export const getFavorite = async (req, res) => {
  const fav = await axios.get(`${baseURL}/favorite`);
  return fav;
};

export function addFavorite(word) {}

export function removeFavorite(word) {}
