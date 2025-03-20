import { createContext, useEffect, useState } from "react";
import { useContext } from "react";
import FavoriteListsContext from "./FavoriteListsContext";
import localforage from "localforage";
import axios from "axios";

const baseURL = window.location.origin;

const AuthContext = createContext({
  isLoggedIn: false,
  user: null,
  checkSession: async () => {},
  setIsLoggedIn: () => {},
  setUser: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkSession();
  }, []);

  const logout = async () => {
    await localforage.removeItem("user", () => {
      console.log("user removed");
    });
    await axios.get(`${baseURL}/api/logout`, {
      withCredentials: true,
    });
    setUser(null);
    setIsLoggedIn(false);
  };

  const checkSession = async () => {
    try {
      const res = await axios.get(`${baseURL}/api/checkAuth`, {
        withCredentials: true, // 讓瀏覽器傳送 Cookie
      });

      if (res.data.isAuthenticated) {
        const newUser = {
          id: res.data.user._id,
          username: res.data.user.username,
        };
        await localforage.setItem("user", newUser);
        setUser(newUser);
        setIsLoggedIn(true);
      } else {
        await localforage.clear(); // Session 遺失就清空前端儲存的資料
        setUser(null);
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error("Session 檢查失敗:", error);
      await localforage.clear();
      setUser(null);
      setIsLoggedIn(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, user, setUser, logout, setIsLoggedIn, checkSession }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
