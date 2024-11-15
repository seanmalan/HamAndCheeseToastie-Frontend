// AuthContext.js
import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState({}); // Initialize user as an empty object

  // Check for token in local storage to persist authentication state
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedToken) setToken(savedToken);
    if (savedUser) setUser(savedUser);
  }, []);

  const login = (data) => {
    console.log(data);
    setToken(data.token);
    setUser({ username: data.username, email: data.email }); // Set user data
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify({ username: data.username, email: data.email, role: data.role, id: data.id }));
  };

  const logout = () => {
    setToken(null);
    setUser({});
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ token, user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
