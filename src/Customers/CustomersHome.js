import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import NotFound from "../Components/NotFound";
import { FormSelect } from "react-bootstrap";

function CustomersHome() {
  const [allCustomers, setAllCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const apiUrl = process.env.REACT_APP_API_URL;
  const url = `${apiUrl}/customer`;

  // Calculate pagination values
  const totalPages = Math.ceil(filteredCustomers.length / rowsPerPage);
  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentCustomers = filteredCustomers.slice(startIndex, endIndex);

  useEffect(() => {
    const fetchWithAuth = (url, options = {}) => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError({ message: "No authentication token found" });
        return;
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

    const fetchCustomers = async () => {
      try {
        const response = await fetchWithAuth(url);
        if (response.status === 401) {
          setError({
            message: "Not Authorised. Please log in again.",
            response,
          });
          return;
        }
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        setAllCustomers(data);
        setFilteredCustomers(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, [url]);

  // Handle search
  useEffect(() => {
    const searchCustomers = () => {
      const searchTermLower = searchTerm.toLowerCase();
      const filtered = allCustomers.filter(
        (customer) =>
          customer.firstName.toLowerCase().includes(searchTermLower) ||
          customer.lastName.toLowerCase().includes(searchTermLower)
      );
      setFilteredCustomers(filtered);
      setPage(0); // Reset to first page when search changes
    };

    searchCustomers();
  }, [searchTerm, allCustomers]);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center">Error: {error.message}</div>;

  return (
    <div className="container mt-4">
      {/* Customer List Section */}
      {filteredCustomers.length === 0 ? (
        <NotFound item="Customers" />
      ) : (
        <>
          <div className="row text-center">
            <h1 className="mb-5">List of Customers</h1>

            {/* Search and Show Entries Section */}
            <div className="row mb-4">
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search customers by name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="col-md-6 d-flex justify-content-end align-items-center">
                <span className="me-2">Show</span>
                <FormSelect
                  style={{ width: "auto" }}
                  value={rowsPerPage}
                  onChange={handleChangeRowsPerPage}
                >
                  <option value={9}>9</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </FormSelect>
                <span className="ms-2">entries</span>
              </div>
            </div>

            {currentCustomers.map((customer) => (
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

          {/* Pagination Controls */}
          <div className="row mt-3">
            <div className="col d-flex justify-content-between align-items-center">
              <div>
                Showing {startIndex + 1} to{" "}
                {Math.min(endIndex, filteredCustomers.length)} of{" "}
                {filteredCustomers.length} entries
              </div>
              <div className="btn-group">
                <button
                  className="btn btn-outline-primary"
                  onClick={() => setPage((p) => Math.max(0, p - 1))}
                  disabled={page === 0}
                >
                  Previous
                </button>
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    className={`btn ${
                      page === index ? "btn-primary" : "btn-outline-primary"
                    }`}
                    onClick={() => setPage(index)}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  className="btn btn-outline-primary"
                  onClick={() =>
                    setPage((p) => Math.min(totalPages - 1, p + 1))
                  }
                  disabled={page === totalPages - 1}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CustomersHome;
