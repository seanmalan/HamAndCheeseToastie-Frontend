import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NotFound from "../Components/NotFound";
import NZDateFormatter from "../Components/DateFormat";
import PaymentMethod from "./Components/PaymentMethod";

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const apiUrl = process.env.REACT_APP_API_URL;

  const fetchTransactions = () => {
    setLoading(true);

    // Build query parameters based on the selected dates
    const queryParams = new URLSearchParams();
    if (dateFrom) queryParams.append("dateFrom", dateFrom);
    if (dateTo) queryParams.append("dateTo", dateTo);

    fetch(`${apiUrl}/Transaction?${queryParams.toString()}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setTransactions(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleFilter = () => {
    fetchTransactions();
  };

  console.log(transactions);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (transactions.length === 0) return <NotFound item="Transactions" />;

  return (
    <div className="container mt-4">
      <h1 className="mb-5 text-center text-primary">Transaction List</h1>

      {/* Date Range Filter */}
      <div className="row mb-4">
        <div className="col">
          <label>
            Start Date:{" "}
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="form-control d-inline-block w-auto"
            />
          </label>
        </div>
        <div className="col">
          <label>
            End Date:{" "}
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="form-control d-inline-block w-auto"
            />
          </label>
        </div>
        <div className="col">
          <button className="btn btn-primary mt-3" onClick={handleFilter}>
            Filter
          </button>
        </div>
      </div>

      {/* Transaction Table */}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Total Amount</th>
            <th>Discount</th>
            <th>Payment Method</th>
            <th>Tax Amount</th>
            <th>Cashier</th>
            <th>Customer</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.transactionId}>
              <td>{transaction.transactionId}</td>
              <td>
                <NZDateFormatter
                  date={transaction.transactionDate}
                  length={"short"}
                />
              </td>
              <td>${transaction.totalAmount.toFixed(2)}</td>
              <td>${transaction.discount.toFixed(2)}</td>
              <td>
                <PaymentMethod paymentMethod={transaction.paymentMethod} />
              </td>
              <td>${transaction.taxAmount.toFixed(2)}</td>
              <td><Link to={`/users/${transaction.userId}`}>{transaction.userId}</Link></td>
              <td><Link to={`/Customers/${transaction.customer.customerId}`}>{transaction.customer.firstName + ' ' + transaction.customer.lastName}</Link></td>
              <td>
                <Link
                  to={`/transactions/${transaction.transactionId}`}
                  className="btn btn-primary btn-sm"
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionList;
