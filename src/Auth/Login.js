// src/Login.js
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const apiUrl = process.env.REACT_APP_API_URL; // Get API URL from .env

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/api/Auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        login(data); // Pass the token and user info to AuthContext
        navigate("/dashboard"); // Redirect to the dashboard or any other page
      } else {
        console.error("Login failed:", data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="form">
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
      </div>
      <div className="form">
        <p>
          Don't have an account? <a href="/register">Register</a>
        </p>
      </div>
    </>
  );
};

export default Login;
