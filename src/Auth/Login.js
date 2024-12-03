import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import JSEncrypt from "jsencrypt";
import { useCustomToast } from "../hooks/useCustomToast";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [publicKey, setPublicKey] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const { showToast } = useCustomToast();

  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchPublicKey = async () => {
      try {
        const response = await fetch(`${apiUrl}/Auth/public-key`);
        if (!response.ok) {
          showToast("Secure Connection", "error", "Failed to fetch public key");
          return;
        }
        const data = await response.json();
        setPublicKey(data.publicKey);
      } catch (error) {
        showToast("Secure Connection", "error", "Failed to initialize secure connection");
        console.error("Error fetching public key:", error);
      }
    };

    fetchPublicKey();
  }, [apiUrl]);

  const encryptPassword = (password) => {
    const encrypt = new JSEncrypt();
    encrypt.setPublicKey(publicKey);
    const encrypted = encrypt.encrypt(password);
    if (!encrypted) {
      throw new Error("Encryption failed");
    }
    return encrypted;
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
        body: JSON.stringify({ email, password: encryptedPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        login(data);
        navigate("/dashboard");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (error) {
      setError("An error occurred during login");
      console.error("Error:", error);
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleLogin} className="login-form">
        <div className="form-group">
          <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input"
          />
        </div>
        <div className="form-group">
          <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input"
          />
        </div>
        <button
            type="submit"
            className="btn btn-primary"
            disabled={!publicKey}
        >
          Login
        </button>
      </form>
      <p>
        Don't have an account?{" "}
        <Link to="/register" className="link">
          Register
        </Link>
      </p>
    </div>
  );
};


export default Login;
