import React, { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useParams, useNavigate } from "react-router-dom";
import NZDateFormatter from "../Components/DateFormat";
import { AuthContext } from "../Context/AuthContext";

function TransactionEdit() {
  const { id } = useParams();
  const [transaction, setTransaction] = useState({
    transactionDate: "2024-10-27",
    totalAmount: "",
    discount: "",
    paymentMethod: "Cash",
    taxAmount: "",
    cashierId: "",
    customerId: "",
  });
  const [customer, setCustomer] = useState({});
  const [transactionItems, setTransactionItems] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    fetch(`${apiUrl}/Transaction/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch transaction data.");
        }
        return response.json();
      })
      .then((data) => {
        setTransaction(data);
        setCustomer(data.customer || {});
        setTransactionItems(data.transactionItems || []);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransaction({ ...transaction, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("No authentication token found. Please log in.");
      return;
    }

    fetch(`${apiUrl}/Transaction/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(transaction),
    })
      .then((response) => {
        if (response.ok) {
          alert("Transaction updated successfully!");
          navigate(`/Transactions/${id}`);
        } else {
          throw new Error("Failed to update the transaction.");
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

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
        <div className="container mt-5">
          <Link to={`/transactions`} className="btn btn-outline-dark mb-3">
            Back to Transactions
          </Link>
          <h1 className="text-center mb-4">Edit Transaction</h1>
          <div className="card shadow-lg p-4">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="transactionDate" className="form-label">
                  Transaction Date:
                </label>
                <div className="mb-2">
                  <NZDateFormatter
                    date={transaction.transactionDate}
                    length={"long"}
                  />
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="totalAmount" className="form-label">
                  Total Amount:
                </label>
                <input
                  type="float"
                  className="form-control"
                  id="totalAmount"
                  name="totalAmount"
                  value={transaction.totalAmount}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="discount" className="form-label">
                  Discount:
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="discount"
                  name="discount"
                  value={transaction.discount}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="paymentMethod" className="form-label">
                  Payment Method:
                </label>
                <select
                  className="form-control"
                  id="paymentMethod"
                  name="paymentMethod"
                  value={transaction.paymentMethod}
                  onChange={handleChange}
                  required
                >
                  <option value="Cash">Cash</option>
                  <option value="CreditCard">Credit Card</option>
                  <option value="DebitCard">Debit Card</option>
                  <option value="MobilePayment">Mobile Payment</option>
                  <option value="GiftCard">Gift Card</option>
                  <option value="BankTransfer">Bank Transfer</option>
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="taxAmount" className="form-label">
                  Tax Amount:
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="taxAmount"
                  name="taxAmount"
                  value={transaction.taxAmount}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="cashierId" className="form-label">
                  Cashier ID:
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="cashierId"
                  name="cashierId"
                  value={transaction.userId}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="customerId" className="form-label">
                  Customer:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="customerId"
                  name="customerId"
                  value={customer.firstName + " " + customer.lastName}
                  onChange={handleChange}
                />
              </div>

              <div className="d-flex justify-content-between">
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>

                <div className="dropdown">
                  <button
                    type="button"
                    className="btn btn-warning dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-expanded={dropdownOpen}
                    onClick={(e) => {
                      e.preventDefault(); // Prevent event bubbling
                      setDropdownOpen(!dropdownOpen);
                    }}
                  >
                    More Actions
                  </button>
                  <ul className={`dropdown-menu${dropdownOpen ? " show" : ""}`}>
                    <li>
                      <Link
                        to="transactionItems"
                        state={{ items: transactionItems }}
                        className="dropdown-item"
                      >
                        View Transaction Items
                      </Link>
                    </li>
                    <li>
                      <button
                        type="button"
                        className="dropdown-item"
                        onClick={() =>
                          navigate(`/customers/${id}/transactions`)
                        }
                      >
                        Customer Transactions
                      </button>
                    </li>
                  </ul>
                </div>

                <Link
                  to={`/Customers/${transaction.customerId}`}
                  className="btn btn-secondary"
                >
                  View Customer
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransactionEdit;
