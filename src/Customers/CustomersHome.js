import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import NotFound from "../Components/NotFound";
import NotAuthenticated from "../Auth/NotAuthenticated";

function CustomersHome() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL;
  const url = `${apiUrl}/api/customer`;

  useEffect(() => {
    const fetchWithAuth = (url, options = {}) => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError({ message: "No authentication token found" });
        return;
      }
      const requestOptions = {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          Authorization: `Bearer ${token}`,
          ...options.headers,
        },
      };
  
      console.log('Request options:', requestOptions); // Debug request
      return fetch(url, requestOptions);
    };

    const fetchCustomers = async () => {
      try {
        const response = await fetchWithAuth(url);
        // Check for Unauthorized (401) status
        if (response.status === 401) {
          setError({ message: "Not Authorised. Please log in again.", response });
            return;
        }
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        setCustomers(data); // Set customer data
      } catch (error) {
        setError(error); // Capture any fetch or parsing errors
      } finally {
        setLoading(false); // Stop loading in all cases
      }
    };

    fetchCustomers();
  }, [url]);

  // Handle loading, error, and no-data display states
  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center">Error: {error.message} </div>;
  if (customers.length === 0) return <NotFound item="Customers" />;

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="row text-center">
        <h1 className="mb-5">List of Customers</h1>
        {customers.map((customer) => (
          <div
            className="col-12 col-md-6 col-lg-4 mb-4"
            key={customer.customerId}
          >
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">
                  {customer.firstName} {customer.lastName}
                </h5>
                <p className="card-text">{customer.email}</p>

                <Link
                  to={`/Customers/${customer.customerId}`}
                  className="btn btn-primary"
                >
                  View Customer
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CustomersHome;
