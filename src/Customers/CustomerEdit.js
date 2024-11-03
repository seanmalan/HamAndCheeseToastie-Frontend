import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import NotFound from "../Components/NotFound";

const CustomerEdit = () => {
  const { id } = useParams(); // Get the customer ID from the URL
  const navigate = useNavigate(); // For navigation after update

  const apiUrl = process.env.REACT_APP_API_URL;


  const [customer, setCustomer] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    isLoyaltyMember: false,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch customer data when the component loads
  useEffect(() => {
    fetch(`${apiUrl}/api/customer/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch customer details.");
        }
        return response.json();
      })
      .then((data) => {
        setCustomer(data); // Set the customer data
        setLoading(false); // Stop loading
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCustomer({
      ...customer,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Send the updated customer data to the API (PUT request)
    fetch(`${apiUrl}/api/customer/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customer),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update customer.");
        }
        return response.json();
      })
      .then(() => {
        alert("Customer updated successfully!");
        navigate("/"); // Redirect back to the customers list
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!customer) return <NotFound item="Customer" />;

  return (
    <div className="container mt-5">
    <Link to={`/Customers`} className="btn btn-secondary mb-3">
        Back to Customers
      </Link>

      <h1>
        Edit Customer: {customer.firstName} {customer.lastName}
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="row mt-5">
          <div className="col-md-6">
            <label htmlFor="firstName" className="form-label">
              First Name:
            </label>
          </div>
          <div className="mb-3 col-md-6">
            <input
              type="text"
              className="form-control"
              id="firstName"
              name="firstName"
              value={customer.firstName}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <label htmlFor="lastName" className="form-label">
              Last Name:
            </label>
          </div>
          <div className="mb-3 col-md-6">
            <input
              type="text"
              className="form-control"
              id="lastName"
              name="lastName"
              value={customer.lastName}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
          </div>
          <div className="mb-3 col-md-6">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={customer.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <label htmlFor="phoneNumber" className="form-label">
              Phone Number:
            </label>
          </div>
          <div className="mb-3 col-md-6">
            <input
              type="tel"
              className="form-control"
              id="phoneNumber"
              name="phoneNumber"
              value={customer.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <label htmlFor="isLoyaltyMember" className="form-label">
              Loyalty Member:
            </label>
          </div>
          <div className="mb-3 col-md-6">
            <input
              type="checkbox"
              className="form-check-input"
              id="isLoyaltyMember"
              name="isLoyaltyMember"
              checked={customer.isLoyaltyMember}
              onChange={handleChange}
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Save Changes
        </button>

      </form>
        <Link to={`/Customers/${id}/transactions`} className="btn btn-secondary">View Customers Transactions</Link>
    </div>
  );
};

export default CustomerEdit;
