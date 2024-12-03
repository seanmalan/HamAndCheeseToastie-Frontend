import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null); // Initialize user as null for consistency

  // Load token and user from local storage when the app initializes
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (savedToken) setToken(savedToken);
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (savedToken) {
      const decodedToken = jwtDecode(savedToken);
      const currentTime = Math.floor(Date.now() / 1000);

      if (decodedToken.exp < currentTime) {
        // Token expired; clear data
        logout();
      } else {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      }
    }
  }, []);

  const login = (data) => {
    console.log(data);
    setToken(data.token);
    setUser({
      username: data.username,
      email: data.email,
      role: data.role,
      id: data.id,
    });
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  const isAuthenticated = !!token;

  return (
      <AuthContext.Provider
          value={{ token, user, login, logout, isAuthenticated }}
      >
        {children}
      </AuthContext.Provider>
  );
};
