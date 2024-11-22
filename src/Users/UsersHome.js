import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NotFound from "../Components/NotFound";

function UsersHome() {
  const [Users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    // Fetch data from the C# API using the fetch API
    fetch(`${apiUrl}/user`) // Make sure to use the correct port for your C# backend
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Convert response to JSON
      })
      .then((data) => {
        setUsers(data); // Update Users state with the data
        setLoading(false); // Stop loading once data is fetched
      })
      .catch((error) => {
        setError(error); // If an error occurs, catch it and update the error state
        setLoading(false); // Stop loading even if there was an error
      });
  }, []);

  // Handle loading, error, and data display states
  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center">Error: {error.message}</div>;
  if (Users.length === 0) return <NotFound item="Users"/>;

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
        {Users.map((User) => (
          <div className="col-12 col-md-6 col-lg-4 mb-4" key={User.Userid}>
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{User.username}</h5>
                <p className="card-text">{User.email}</p>

                <Link to={`/Users/${User.id}`} className="btn btn-primary">
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
