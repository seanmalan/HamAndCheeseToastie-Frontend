import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Delete from "../Components/DeleteButton";

const CustomerEdit = () => {
  const { id } = useParams(); // Get the customer ID from the URL
  const navigate = useNavigate(); // For navigation after update

  const apiUrl = process.env.REACT_APP_API_URL; // API URL from env file
  const url = `${apiUrl}/Customer/${id}`;

  const [customer, setCustomer] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    isLoyaltyMember: false,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleDeleteSuccess = () => {
    navigate("/customers");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No authentication token found. Please log in.");
      setLoading(false);
      return;
    }

    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch customer details.");
        return response.json();
      })
      .then((data) => {
        setCustomer(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [url]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCustomer({
      ...customer,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("No authentication token found. Please log in.");
      return;
    }

    fetch(`${apiUrl}/Customer/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(customer),
    })
      .then((response) => {
        if (response.status === 204) {
          return null;
        }

        if (!response.ok) throw new Error("Failed to update customer.");
        return response.json();
      })
      .then(() => {
        alert("Customer updated successfully!");
        navigate(`/customers/${id}`);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="page">
      <div className="form-container">
        <h1>Edit Customer</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              className="form-control"
              value={customer.firstName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="lastName" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              className="form-control"
              value={customer.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              value={customer.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="phoneNumber" className="form-label">
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              className="form-control"
              value={customer.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3 form-check loyaltyMember">
            <input
              type="checkbox"
              id="isLoyaltyMember"
              name="isLoyaltyMember"
              className="form-check-input"
              checked={customer.isLoyaltyMember}
              onChange={handleChange}
            />
            <label htmlFor="isLoyaltyMember" className="form-check-label">
              Loyalty Member
            </label>
          </div>

          <div className="button-container">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate("/customers")}
            >
              Cancel
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
                  <Delete
                    endpoint={`Customer`}
                    id={id}
                    onDeleteSuccess={handleDeleteSuccess}
                    component={"Customer"}
                  />
                </li>
                <li>
                  <button
                    type="button"
                    className="dropdown-item btn btn-warning"
                    onClick={() => navigate(`/customers/${id}/transactions`)}
                  >
                    Customer Transactions
                  </button>
                </li>
              </ul>
            </div>
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerEdit;
