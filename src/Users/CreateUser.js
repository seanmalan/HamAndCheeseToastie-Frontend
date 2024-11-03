import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserCreate = () => {
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;

  
  const [user, setUser] = useState({
    username: "",
    password: "",
    email: "",
    emailConfirmed: "",
    passwordHash: "",
    role: 1,
  });

  const [error, setError] = useState(null);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`${apiUrl}/api/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to create user.");
        }
        return response.json();
      })
      .then(() => {
        alert("User created successfully!");
        navigate("/users"); // Redirect to users list or another page
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <div className="container mt-5">
      <h1>Create New User</h1>
      {error && <div className="alert alert-danger">Error: {error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username:</label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            value={user.username}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password:</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email:</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="emailConfirmed" className="form-label">Email Confirmed:</label>
          <input
            type="text"
            className="form-control"
            id="emailConfirmed"
            name="emailConfirmed"
            value={user.emailConfirmed}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="passwordHash" className="form-label">Password Hash:</label>
          <input
            type="text"
            className="form-control"
            id="passwordHash"
            name="passwordHash"
            value={user.passwordHash}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="role" className="form-label">Role:</label>
          <input
            type="number"
            className="form-control"
            id="role"
            name="role"
            value={user.role}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Create User
        </button>
      </form>
    </div>
  );
};

export default UserCreate;
