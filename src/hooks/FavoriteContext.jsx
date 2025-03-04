import { createContext, useEffect, useState } from "react";
import {
  addFavorite,
  getFavorite,
  removeFavorite,
} from "../pages/Favorite/FavoriteWords";
import localforage from "localforage";

const FavoriteContext = createContext({
  favorite: {},
  favHandler: () => {},
});

export const FavoriteContentProvider = (props) => {
  const [lists, setLists] = useState([]);
  const [currentList, setCurrentList] = useState(null);
  const [favorites, setFavorites] = useState([]);

  /*useEffect(() => {
    const fetchLists = async () => {
      const user = await localforage.getItem("user");
      if (user) {
        const favwords = await getFavorite(user.id);
        setFavorites(favwords);
      }
    };
    fetchList();
  }, []);*/

  useEffect(() => {
    const fetchFavorites = async () => {
      const user = await localforage.getItem("user");
      if (user) {
        const favwords = await getFavorite(user.id);
        setFavorites(favwords);
      }
    };
    fetchFavorites();
  }, []);

  const toggleFavorites = async (word) => {
    //調動ui state
    const { vocabulary, phonetics } = word;
    const wordData = { word: vocabulary, audio: phonetics.audio };
    setFavorites((prev) => {
      const isFav = prev.includes(wordData);
      const newFavorites = isFav
        ? prev.filter((item) => item !== wordData)
        : [...prev, wordData];
      return newFavorites;
    });

    try {
      //判斷是否登入
      const user = await localforage.getItem("user");
      if (user) {
        const isFav = favorites.includes(wordData);
        isFav
          ? await deleteFavorite(user.id, wordData)
          : await addFavorite(user.id, wordData);
      }
    } catch (e) {
      console.error("Failed to update favorites:", error);
    }
  };

  return (
    <FavoriteContext.Provider
      value={{ favorites: favorites, toggleFavorites: toggleFavorites }}
    >
      {props.children}
    </FavoriteContext.Provider>
  );
};

export default FavoriteContext;
