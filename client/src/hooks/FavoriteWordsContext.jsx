import { createContext, useEffect, useState, useContext, useMemo } from "react";
import {
  addFavoriteWord,
  getFavoriteWords,
  removeFavoriteWord,
  getAllFavoriteWords,
} from "../apis/FavoriteWordsApi";
import localforage from "localforage";
import AuthContext from "./AuthContext";



export const FavoriteWordsContext = createContext({
  isFav: false,
  setIsFav: () => {},
  currentFavWords: [],
  setCurrentFavWords: () => {},
  allFavoriteWords: [],
  fetchCurrentFavWords: async () => {},
  addFavWord: async () => {},
  removeFavWord: async () => {},
});

export const FavoriteWordsContextProvider = (props) => {
  const [currentFavWords, setCurrentFavWords] = useState([]);
  const [allFavoriteWords, setAllFavoriteWords] = useState([]);
  const [isFav, setIsFav] = useState(false);
  const { user } = useContext(AuthContext);


  const fetchCurrentFavWords = async (listID) => {
    const user = await localforage.getItem("user");
    if (user) {
      try {
        const words = await getFavoriteWords(user.id, listID);
        setCurrentFavWords(words);
      } catch (e) {
        console.error(e.message);
      }
    }
  };
  const fetchAllFavWords = async () => {
    const user = await localforage.getItem("user");
    console.log(user);
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
        setCurrentFavWords((prev) =>
          prev.filter((word) => word.id !== wordID)
        );
        await removeFavoriteWord(user.id, listID, wordID);
        await fetchCurrentFavWords(listID);
      } catch (e) {
        console.error(e.message);
        await fetchCurrentFavWords(listID);
      }
    }
  };

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
