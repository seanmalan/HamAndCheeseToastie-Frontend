// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import { login, logout } from "../Services/AuthService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if token is in localStorage on initial load
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      setUser({ username: "User" }); // Placeholder; ideally you'd parse token or fetch user data
    }
  }, []);

  const handleLogin = async (username, password) => {
    try {
      const data = await login(username, password);
      setIsAuthenticated(true);
      setUser({ username: data.username });
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const handleLogout = () => {
    logout();
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
