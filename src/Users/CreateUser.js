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

    fetch(`${apiUrl}/user`, {
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


      <div
          className="d-flex justify-content-center align-items-center vh-100"
          style={{backgroundColor: "#d0e7f9"}}
      >
        <div
            className="p-5 rounded shadow"
            style={{
              backgroundColor: "#f2f2f2",
              maxWidth: "600px",
              width: "100%",
            }}
        >
          <h1 className="text-center mb-4">Create New User</h1>
          {error && <div className="alert alert-danger">{`Error: ${error}`}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username:
              </label>
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
              <label htmlFor="password" className="form-label">
                Password:
              </label>
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
              <label htmlFor="email" className="form-label">
                Email:
              </label>
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
              <label htmlFor="emailConfirmed" className="form-label">
                Email Confirmed:
              </label>
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
            { user.role === 1 ? (
            <div className="mb-3">
              <label htmlFor="role" className="form-label">
                Role:
              </label>
              <input
                  type="number"
                  className="form-control"
                  id="role"
                  name="role"
                  value="3"
                  onChange={handleChange}
                  required
              />
            </div>
                ) : null}

            <div className="d-flex justify-content-between align-items-center">
              <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => navigate("/users")}
              >
                Back to Users
              </button>
              <button type="submit" className="btn btn-primary">
                Create User
              </button>
            </div>
          </form>
        </div>
      </div>
  );
};

export default UserCreate;
