import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import NotFound from "../Components/NotFound";

function UsersHome() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const apiUrl = process.env.REACT_APP_API_URL;
  const url = `${apiUrl}/User`;

  useEffect(() => {
    let isMounted = true;

    const fetchWithAuth = (url, options = {}) => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return null;
      }
      return fetch(url, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          ...options.headers,
        },
      });
    };

    const fetchUsers = async () => {
      try {
        const response = await fetchWithAuth(url);
        if (!response) return; // Handle case where fetchWithAuth returns null

        if (response.status === 401) {
          // localStorage.removeItem("token"); // Clear invalid token
          // navigate("/login");
          return;
        }

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        if (isMounted) {
          setUsers(data);
        }
      } catch (error) {
        if (isMounted) {
          setError(error);
          console.error("Failed to fetch users:", error);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchUsers();

    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, [url, navigate]);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center">Error: {error.message}</div>;
  if (users.length === 0) return <NotFound item="Users" />;

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="row text-center">
        <h1 className="mb-5">List of Users</h1>
        <Link to="/Users/new" className="btn btn-primary mb-4">
          Add User
        </Link>
        {users.map((user) => (
          <div className="col-12 col-md-6 col-lg-4 mb-4" key={user.id}>
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{user.username}</h5>
                <p className="card-text">{user.email}</p>
                {user.roleName && (
                  <p className="card-text">
                    <small className="text-muted">Role: {user.roleName}</small>
                  </p>
                )}
                <Link to={`/Users/${user.id}`} className="btn btn-primary">
                  View User
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UsersHome;
