import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import JSEncrypt from "jsencrypt";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [publicKey, setPublicKey] = useState("");
  const [error, setError] = useState("");
  const { login, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchPublicKey = async () => {
      try {
        const response = await fetch(`${apiUrl}/Auth/public-key`);
        if (!response.ok) {
          throw new Error("Failed to fetch public key");
        }
        const data = await response.json();
        setPublicKey(data.publicKey);
      } catch (error) {
        setError("Failed to initialize secure connection");
        console.error("Error fetching public key:", error);
      }
    };

    fetchPublicKey();
  }, [apiUrl]);

  const encryptPassword = (password) => {
    try {
      const encrypt = new JSEncrypt();
      encrypt.setPublicKey(publicKey);
      const encrypted = encrypt.encrypt(password);
      if (!encrypted) {
        throw new Error("Encryption failed");
      }
      return encrypted;
    } catch (error) {
      console.error("Encryption error:", error);
      throw error;
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (!publicKey) {
        setError("Secure connection not established. Please try again.");
        return;
      }

      const encryptedPassword = encryptPassword(password);

      const response = await fetch(`${apiUrl}/Auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password: encryptedPassword,
        }),
      });

      const data = await response.json();

      console.log(data);

      if (response.ok) {
        login({
          token: data.token,
          username: data.username,
          email: data.email,
          role: data.role,
          id: data.id,
        });
        navigate("/dashboard");
      } else {
        setError(data.message || "Login failed");
        console.error("Login failed:", data);
      }
    } catch (error) {
      setError("An error occurred during login");
      console.error("Error:", error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        {error && (
          <div className="error-message text-red-500 mb-4">{error}</div>
        )}
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submit-btn" disabled={!publicKey}>
            Login
          </button>
        </form>
        <p className="register-link">
          Don't have an account? <a href="/register">Register</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
