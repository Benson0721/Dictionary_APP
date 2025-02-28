import { createContext, useEffect, useState } from "react";
import localforage from "localforage";

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
