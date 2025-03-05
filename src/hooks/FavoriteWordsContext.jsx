import { createContext, useEffect, useState, useContext, useMemo } from "react";
import {
  addFavoriteWord,
  getFavoriteWords,
  removeFavoriteWord,
} from "../pages/Favorite/FavoriteWords";
import localforage from "localforage";
import AuthContext from "./AuthContext";
import FavoriteListsContext from "./FavoriteListsContext";
export const FavoriteWordsContext = createContext({
  currentWords: [],
  fetchCurrentWords: () => {},
  addFavWord: () => {},
  removeFavWord: () => {},
});

export const FavoriteWordsContentProvider = (props) => {
  const [currentWords, setCurrentWords] = useState([]);
  const { user } = useContext(AuthContext);
  const { currentList } = useContext(FavoriteListsContext);

  const fetchCurrentWords = async () => {
    const user = await localforage.getItem("user");
    if (user) {
      try {
        const words = await getFavoriteWords(user.id, currentList);
        setCurrentWords(words);
      } catch (e) {
        console.error(e.message);
      }
    }
  };
  const addFavWord = async (newWord) => {
    const user = await localforage.getItem("user");
    if (user) {
      try {
        await addFavoriteWord(user.id, currentList, newWord);
        await fetchCurrentWords();
      } catch (e) {
        console.error(e.message);
        await fetchCurrentWords();
      }
    }
  };

  const removeFavWord = async (listID, wordID) => {
    const user = await localforage.getItem("user");
    if (user) {
      try {
        await removeFavoriteWord(user.id, listID, wordID);
        await fetchCurrentWords();
      } catch (e) {
        console.error(e.message);
        await fetchCurrentWords();
      }
    }
  };

  useEffect(() => {
    const handlefetchWords = async () => {
      await fetchCurrentWords();
    };

    if (currentList && user) {
      handlefetchWords();
    }
  }, [currentList, user]);

  const contextValue = useMemo(
    () => ({
      currentWords,
      fetchCurrentWords,
      addFavWord,
      removeFavWord,
    }),
    [currentWords, fetchCurrentWords]
  );

  return (
    <FavoriteWordsContext.Provider value={contextValue}>
      {props.children}
    </FavoriteWordsContext.Provider>
  );
};

export default FavoriteWordsContext;
