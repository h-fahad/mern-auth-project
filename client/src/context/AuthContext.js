// src/context/AuthContext.js

import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);

  // Restore authentication state and user data on initial load
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("userData");

    if (token && user) {
      setIsAuthenticated(true);
      setUserData(JSON.parse(user)); // Parse the stored JSON string
    }
  }, []);

  // Function to log in the user and set authentication state
  const saveLogin = (data) => {
    const { token, user } = data;

    localStorage.setItem("token", token); // Store token
    localStorage.setItem("userData", JSON.stringify(user)); // Store user data as JSON string

    setUserData(user);
    setIsAuthenticated(true);
  };

  // Function to log out the user
  const logout = () => {
    localStorage.removeItem("token"); // Remove token
    localStorage.removeItem("userData"); // Remove user data

    setUserData(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, userData, saveLogin, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
