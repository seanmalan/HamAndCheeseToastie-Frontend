import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function RecentTransactionsDashboard() {
  const [recentTransactions, setRecentTransactions] = useState(0); // State to hold total sales
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const apiUrl = process.env.REACT_APP_API_URL; // Get API URL from .env

  useEffect(() => {
    if (!apiUrl) {
      setError("API URL is not defined.");
      setLoading(false);
      return;
    }

    fetch(`${apiUrl}/api/Dashboard/recent_transactions`) // Fetch total transactions from the API
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch recent transactions.");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data)
        setRecentTransactions(data); // Populate the total sales
        setLoading(false); // Stop loading
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [apiUrl]);

  if (loading) {
    return <div className="text-center">Loading...</div>; // Loading state
  }

  if (error) {
    return <div className="text-center text-danger">{error}</div>; // Error state
  }

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Recent Transactions</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Total Amount</th>
            <th>Discount</th>
            <th>Payment Method</th>
            <th>Tax Amount</th>
            <th>Cashier ID</th>
            <th>Customer ID</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {recentTransactions.map((transaction) => (
            <tr key={transaction.transactionId}>
              <td>{transaction.transactionId}</td>
              <td>{new Date(transaction.transactionDate).toLocaleDateString()}</td>
              <td>${transaction.totalAmount.toFixed(2)}</td>
              <td>${transaction.discount.toFixed(2)}</td>
              <td>{transaction.paymentMethod}</td>
              <td>${transaction.taxAmount.toFixed(2)}</td>
              <td>{transaction.cashierId}</td>
              <td>{transaction.customerId}</td>
              <td>
                <Link to={`/transactions/${transaction.transactionId}`} className="btn btn-primary btn-sm">
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RecentTransactionsDashboard;
