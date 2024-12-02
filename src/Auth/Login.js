import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import JSEncrypt from "jsencrypt";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [publicKey, setPublicKey] = useState("");
  const { login, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const apiUrl = process.env.REACT_APP_API_URL;

  // Fetch public key when component mounts
  useEffect(() => {
    const fetchPublicKey = async () => {
      try {
        const response = await fetch(`${apiUrl}/Auth/public-key`);
        const data = await response.json();
        setPublicKey(data.publicKey);
      } catch (error) {
        console.error("Error fetching public key:", error);
      }
    };

    fetchPublicKey();
  }, [apiUrl]);

  const encryptPassword = (password) => {
    const encrypt = new JSEncrypt();
    encrypt.setPublicKey(publicKey);
    return encrypt.encrypt(password);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
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
        console.error("Login failed:", data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
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
          <button type="submit" className="submit-btn">
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
