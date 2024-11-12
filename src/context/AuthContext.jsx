import React, { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { removeToken, storeToken, getToken } from "../utils/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // function to store token and set user data
  const login = (token) => {
    storeToken(token);
    const decodedUser = jwtDecode(token);
    console.log("de", decodedUser);
    setUser(decodedUser);
  };

  // log out the user
  const logout = () => {
    removeToken();
    setUser(null);
  };

  // Initialize user from token on app load or reload
  useEffect(() => {
    const token = getToken();
    if (token) {
      try {
        const decodedUser = jwtDecode(token);
        console.log("de", decodedUser);
        setUser(decodedUser);
      } catch (error) {
        console.error("Failed to decode token", error);
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
