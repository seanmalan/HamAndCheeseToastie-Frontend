import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const UserEdit = () => {
  const { id } = useParams(); // Get the user ID from the URL
  const navigate = useNavigate(); // For navigation after update

  const [user, setUser] = useState({
    username: "",
    password: "",
    email: "",
    emailConfirmed: "",
    passwordHash: "",
    role: 1,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user data when the component loads
  useEffect(() => {
    fetch(`https://localhost:7276/api/user/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch user details.");
        }
        return response.json();
      })
      .then((data) => {
        setUser(data); // Populate the form with user data
        setLoading(false); // Stop loading
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`https://localhost:7276/api/user/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update user.");
        }
        return response.json();
      })
      .then(() => {
        alert("User updated successfully!");
        navigate("/users"); // Redirect to users list or another page
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mt-5">
      <Link to={`/users`} className="btn btn-secondary">
        Back to Users
      </Link>

      <h1>Edit User: {user.username}</h1>
      {error && <div className="alert alert-danger">Error: {error}</div>}
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
        <div className="mb-3">
          <label htmlFor="passwordHash" className="form-label">
            Password Hash:
          </label>
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
          <label htmlFor="role" className="form-label">
            Role:
          </label>
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

        <div className="mb-3 d-flex justify-content-between align-items-center">
          <button type="submit" className="btn btn-primary">
            Save Changes
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => {
              fetch(`https://localhost:7276/api/user/${id}`, {
                method: "DELETE",
              })
                .then((response) => {
                  if (!response.ok) {
                    throw new Error("Failed to delete user.");
                  }
                  return response.json();
                })
                .then(() => {
                  alert("User deleted successfully!");
                  navigate("/users"); // Redirect to users list or another page
                })
                .catch((err) => {
                  setError(err.message);
                });
            }}
          >
            Delete User
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserEdit;
