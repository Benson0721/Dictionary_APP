import { createContext, useEffect, useState, useContext, useMemo } from "react";

import {
  getFavoriteLists,
  addFavoriteList,
  updateFavoriteLists,
  deleteFavoriteList,
} from "../apis/FavoriteListApi";

import localforage from "localforage";
import AuthContext from "./AuthContext";

export const FavoriteListsContext = createContext({
  lists: [],
  favoriteWords: [],
  currentList: null,
  isFav: false,
  setLists: () => {},
  setCurrentList: () => {},
  toggleHeart: async () => {},
  fetchLists: async () => {},
  addLists: async () => {},
  updateLists: async () => {},
  deleteLists: async () => {},
});

export const FavoriteListsContextProvider = (props) => {
  const [lists, setLists] = useState([]);

  const [currentList, setCurrentList] = useState(null);
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    if (user?.id && user?.username) {
      fetchLists(user.id);
    }
  }, [user, setUser]);

  const fetchLists = async () => {
    try {
      const data = await getFavoriteLists(user.id);
      const { favLists } = data;
      setLists(favLists);
    } catch (e) {
      console.error(e.message);
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
  const updateLists = async (updatedLists) => {
    const user = await localforage.getItem("user");
    if (user) {
      try {
        await updateFavoriteLists(user.id, updatedLists);
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

  const contextValue = useMemo(
    () => ({
      lists,
      currentList,
      setLists,
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
