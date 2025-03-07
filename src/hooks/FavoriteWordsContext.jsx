import { createContext, useEffect, useState, useContext, useMemo } from "react";
import {
  addFavoriteWord,
  getFavoriteWords,
  removeFavoriteWord,
  getAllFavoriteWords,
} from "../pages/Favorite/FavoriteWords";
import localforage from "localforage";
import AuthContext from "./AuthContext";
import FavoriteListsContext from "./FavoriteListsContext";
import DictionaryContext from "./DictionaryContext";
export const FavoriteWordsContext = createContext({
  isFav: false,
  setIsFav: () => {},
  currentFavWords: [],
  allFavoriteWords: [],
  setCurrentFavWords: () => {},
  fetchCurrentFavWords: () => {},
  addFavWord: () => {},
  removeFavWord: () => {},
});

export const FavoriteWordsContentProvider = (props) => {
  const [currentFavWords, setCurrentFavWords] = useState([]);
  const [allFavoriteWords, setAllFavoriteWords] = useState([]);
  const [isFav, setIsFav] = useState(false);
  const { user } = useContext(AuthContext);
  const { currentList } = useContext(FavoriteListsContext);
  const { word } = useContext(DictionaryContext);
  const fetchCurrentFavWords = async () => {
    const user = await localforage.getItem("user");
    if (user) {
      try {
        const words = await getFavoriteWords(user.id, currentList);
        setCurrentFavWords(words);
      } catch (e) {
        console.error(e.message);
      }
    }
  };
  const fetchAllFavWords = async () => {
    const user = await localforage.getItem("user");
    if (user) {
      try {
        const words = await getAllFavoriteWords(user.id);
        console.log(words);
        setAllFavoriteWords(words);
      } catch (e) {
        console.error(e.message);
      }
    }
  };
  const addFavWord = async (listID, newWord) => {
    const user = await localforage.getItem("user");

    if (user) {
      try {
        console.log("前端收到:", listID, newWord);
        await addFavoriteWord(user.id, listID, newWord);
        await fetchAllFavWords();
      } catch (e) {
        console.error(e.message);
        await fetchAllFavWords();
      }
    }
  };

  const removeFavWord = async (listID, wordID) => {
    const user = await localforage.getItem("user");
    if (user) {
      try {
        await removeFavoriteWord(user.id, listID, wordID);
        await fetchCurrentFavWords();
      } catch (e) {
        console.error(e.message);
        await fetchCurrentFavWords();
      }
    }
  };

  useEffect(() => {
    const handlefetchWords = async () => {
      await fetchCurrentFavWords();
    };

    if (currentList && user) {
      handlefetchWords();
    }
  }, [currentList, user]);

  useEffect(() => {
    const handleAllWords = async () => {
      await fetchAllFavWords();
    };

    if (user) {
      handleAllWords();
    }
  }, [user]);

  const contextValue = useMemo(
    () => ({
      isFav,
      setIsFav,
      currentFavWords,
      allFavoriteWords,
      setCurrentFavWords,
      fetchCurrentFavWords,
      addFavWord,
      removeFavWord,
    }),
    [currentFavWords, fetchCurrentFavWords]
  );

  return (
    <FavoriteWordsContext.Provider value={contextValue}>
      {props.children}
    </FavoriteWordsContext.Provider>
  );
};

export default FavoriteWordsContext;
