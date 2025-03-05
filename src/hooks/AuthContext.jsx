import { createContext, useEffect, useState } from "react";
import localforage from "localforage";
import axios from "axios";
const baseURL = window.location.origin;

const AuthContext = createContext({
  isLoggedIn: false,
  user: null,
  setUser: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUserStatus = async () => {
      const savedUser = await localforage.getItem("user");
      if (savedUser) {
        setUser(savedUser);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    };

    checkUserStatus();
  }, [user]);

  const logout = async () => {
    await localforage.removeItem("user", () => {
      console.log("user removed");
    });
    const res = await axios.get(`${baseURL}/api/logout`, {
      withCredentials: true,
    });
    console.log(res);
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
