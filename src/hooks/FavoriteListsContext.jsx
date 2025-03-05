import { createContext, useEffect, useState, useContext, useMemo } from "react";

import {
  getFavoriteLists,
  addFavoriteList,
  updateFavoriteList,
  deleteFavoriteList,
} from "../pages/Favorite/FavoriteList";

import localforage from "localforage";
import AuthContext from "./AuthContext";

export const FavoriteListsContext = createContext({
  lists: [],
  favoriteWords: [],
  currentList: null,
  isFav: false,
  setCurrentList: () => {},
  toggleHeart: async () => {},
  fetchLists: async () => {},
  addLists: async () => {},
  updateLists: async () => {},
  deleteLists: async () => {},
});

export const FavoriteListsContentProvider = (props) => {
  const [lists, setLists] = useState([]);
  const [favoriteWords, setFavoriteWords] = useState([]);
  const [isFav, setIsFav] = useState(false);
  const [currentList, setCurrentList] = useState(null);
  const { user } = useContext(AuthContext);

  const fetchLists = async () => {
    const user = await localforage.getItem("user");
    if (user) {
      try {
        const { favlists, favWords } = await getFavoriteLists(user.id);
        setLists(favlists);
        setFavoriteWords(favWords);
      } catch (e) {
        console.error(e.message);
      }
    }
  };
  const addLists = async (newList) => {
    const user = await localforage.getItem("user");
    if (user) {
      try {
        // 先更新前端資料，讓使用者感知到新增
        setLists((prev) =>
          Array.isArray(prev) ? [...prev, newList] : [newList]
        );

        // 執行添加到資料庫的操作
        await addFavoriteList(user.id, newList);

        // 完成資料庫操作後再更新列表
        return await fetchLists();
      } catch (e) {
        console.error(e.message);
        // 發生錯誤時也要刷新列表，以免顯示錯誤資料
        return await fetchLists();
      }
    }
  };
  const updateLists = async (listID, updatedList) => {
    const user = await localforage.getItem("user");
    if (user) {
      setLists((prevLists) =>
        prevLists.map((list) =>
          list.id === listID ? { ...list, ...updatedList } : list
        )
      );

      try {
        await updateFavoriteList(user.id, listID, updatedList);
        await fetchLists();
      } catch (e) {
        console.error(e.message);
        await fetchLists();
      }
    }
  };
  const deleteLists = async (listID) => {
    const user = await localforage.getItem("user");
    if (user) {
      setLists((prevLists) => prevLists.filter((list) => list.id !== listID));

      try {
        await deleteFavoriteList(user.id, listID);
        await fetchLists();
      } catch (e) {
        console.error(e.message);
        await fetchLists();
      }
    }
  };

  const toggleHeart = async (word) => {
    const user = await localforage.getItem("user");
    if (user) {
      favoriteWords?.includes(word) ? setIsFav(true) : setIsFav(false);
    }
  };

  const contextValue = useMemo(
    () => ({
      lists,
      favoriteWords,
      currentList,
      isFav,
      toggleHeart,
      setCurrentList,
      fetchLists,
      addLists,
      updateLists,
      deleteLists,
    }),
    [lists, fetchLists]
  );

  return (
    <FavoriteListsContext.Provider value={contextValue}>
      {props.children}
    </FavoriteListsContext.Provider>
  );
};

export default FavoriteListsContext;
