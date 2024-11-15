// src/services/authService.js

const apiUrl = process.env.REACT_APP_API_URL; // Get API URL from .env


// Register function
export const register = async (username, password) => {
  const response = await fetch(`${apiUrl}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) throw new Error("Registration failed");
  return response.json();
};

// Login function
export const login = async (username, password) => {
  const response = await fetch(`${apiUrl}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) throw new Error("Login failed");

  const data = await response.json();
  const { token } = data;

  // Store token in local storage
  localStorage.setItem("token", token);
  return data;
};

// Logout function
export const logout = () => {
  localStorage.removeItem("token");
};
