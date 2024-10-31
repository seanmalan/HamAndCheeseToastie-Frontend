import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useParams } from "react-router-dom";

function TransactionEdit() {
  const { id } = useParams(); // To get the transaction ID if needed
  const [transaction, setTransaction] = useState({
    transactionDate: "2024-10-27", // Set to the initial date here
    totalAmount: "",
    discount: "",
    paymentMethod: "Cash",
    taxAmount: "",
    cashierId: "",
    customerId: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://localhost:7276/api/Transaction/${id}`) // Replace with your API URL
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setTransaction(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransaction({ ...transaction, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Transaction updated:", transaction);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mt-5">
      <Link to={`/transactions`} className="btn btn-secondary mb-3">
        Back to Transactions
      </Link>
      <h1>Edit Transaction</h1>
      <form onSubmit={handleSubmit}>
        <div className="row mt-5">
          <div className="col-md-6">
            <label htmlFor="transactionDate" className="form-label">
              Transaction Date:
            </label>
          </div>
          <div className="mb-3 col-md-6">
            <input
              type="date"
              className="form-control"
              id="transactionDate"
              name="transactionDate"
              value={transaction.transactionDate}
              readOnly
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <label htmlFor="totalAmount" className="form-label">
              Total Amount:
            </label>
          </div>
          <div className="mb-3 col-md-6">
            <input
              type="number"
              className="form-control"
              id="totalAmount"
              name="totalAmount"
              value={transaction.totalAmount}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <label htmlFor="discount" className="form-label">
              Discount:
            </label>
          </div>
          <div className="mb-3 col-md-6">
            <input
              type="number"
              className="form-control"
              id="discount"
              name="discount"
              value={transaction.discount}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <label htmlFor="paymentMethod" className="form-label">
              Payment Method:
            </label>
          </div>
          <div className="mb-3 col-md-6">
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
        </div>

        <div className="row">
          <div className="col-md-6">
            <label htmlFor="taxAmount" className="form-label">
              Tax Amount:
            </label>
          </div>
          <div className="mb-3 col-md-6">
            <input
              type="number"
              className="form-control"
              id="taxAmount"
              name="taxAmount"
              value={transaction.taxAmount}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <label htmlFor="cashierId" className="form-label">
              Cashier ID:
            </label>
          </div>
          <div className="mb-3 col-md-6">
            <input
              type="number"
              className="form-control"
              id="cashierId"
              name="cashierId"
              value={transaction.cashierId}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <label htmlFor="customerId" className="form-label">
              Customer ID:
            </label>
          </div>
          <div className="mb-3 col-md-6">
            <input
              type="number"
              className="form-control"
              id="customerId"
              name="customerId"
              value={transaction.customerId}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="mb-3 d-flex justify-content-between align-items-center">
          <button type="submit" className="btn btn-primary">
            Save Changes
          </button>

          <Link to={`/Customers/${transaction.customerId}`} className="btn btn-secondary mb-3">
            View Customer
          </Link>
        </div>
      </form>
    </div>
  );
}

export default TransactionEdit;
