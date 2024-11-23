import React, {useState, useEffect, useContext} from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import NotFound from "../Components/NotFound";
import { AuthContext } from "../Context/AuthContext";

const UserEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;
  const { isAuthenticated, user } = useContext(AuthContext);

  const [editUser, setEditUser] = useState({
    username: "",
    password: "",
    email: "",
    emailConfirmed: "",
    passwordHash: "",
    role: 1,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);


  useEffect(() => {
    fetch(`${apiUrl}/user/${id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch user details.");
          }
          return response.json();
        })
        .then((data) => {
          setEditUser(data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditUser({ ...editUser, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`${apiUrl}/user/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editUser),
    })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to update user.");
          }
          return response.json();
        })
        .then(() => {
          alert("User updated successfully!");
          navigate("/users");
        })
        .catch((err) => {
          setError(err.message);
        });
  };

  const handleForgotPassword = () => {
    fetch(`${apiUrl}/Auth/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: forgotPasswordEmail }),
    })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to send password reset link.");
          }
          return response.json();
        })
        .then(() => {
          alert("Password reset link sent!");
        })
        .catch((err) => {
          setError(err.message);
        });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!editUser) return <NotFound item="User" />;

  return (
      <div
          className="d-flex justify-content-center align-items-center vh-100"
          style={{ backgroundColor: "#d0e7f9" }}
      >
        <div
            className="p-5 rounded shadow"
            style={{
              backgroundColor: "#f2f2f2",
              maxWidth: "600px",
              width: "100%",
            }}
        >
          <Link to={`/users`} className="btn btn-secondary mb-3">
            Back to Users
          </Link>

          <h1 className="text-center">Edit User: {editUser.username}</h1>
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
                  value={editUser.username}
                  onChange={handleChange}
                  required
              />
            </div>
            {user.id === editUser.id ? (
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password:
                  </label>
                  <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      value={editUser.password}
                      onChange={handleChange}
                      required
                  />
                </div>
            ) : null}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email:
              </label>
              <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={editUser.email}
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
                  value={editUser.role}
                  onChange={handleChange}
                  required
              />
            </div>
            ) : ( null )}

            <div className="mb-3 d-flex justify-content-between align-items-center">
              <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => {
                    fetch(`${apiUrl}/user/${id}`, {
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
                          navigate("/users");
                        })
                        .catch((err) => {
                          setError(err.message);
                        });
                  }}
              >
                Delete User
              </button>

              <div className="dropdown">
              <button
                type="button"
                className="btn btn-warning dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded={dropdownOpen}
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                More Actions
              </button>
              <ul className={`dropdown-menu${dropdownOpen ? " show" : ""}`}>
                <li>
                  Something Else
                </li>
                <li>
                  <button
                    type="button"
                    className="dropdown-item btn btn-warning"
                    onClick={() => navigate(`/Users/${id}/Transactions`)}
                  >
                    View Transactions
                  </button>
                </li>
              </ul>
            </div>
              <button type="submit" className="btn btn-primary">
                Save Changes
              </button>
            </div>
          </form>

          <div className="accordion mt-4" id="forgotPasswordAccordion">
          <div className="accordion-item">
              <h2 className="accordion-header" id="forgotPasswordHeading">
                <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#forgotPasswordCollapse"
                    aria-expanded="true"
                    aria-controls="forgotPasswordCollapse"
                >
                  Forgot Password?
                </button>
              </h2>
              <div
                  id="forgotPasswordCollapse"
                  className="accordion-collapse collapse"
                  aria-labelledby="forgotPasswordHeading"
                  data-bs-parent="#forgotPasswordAccordion"
              >
                <div className="accordion-body">
                  <label htmlFor="forgotPasswordEmail" className="form-label">
                    Enter your email address:
                  </label>
                  <input
                      type="email"
                      id="forgotPasswordEmail"
                      className="form-control mb-2"
                      value={forgotPasswordEmail}
                      onChange={(e) => setForgotPasswordEmail(e.target.value)}
                      required
                  />
                  <button
                      className="btn btn-warning"
                      onClick={handleForgotPassword}
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default UserEdit;
