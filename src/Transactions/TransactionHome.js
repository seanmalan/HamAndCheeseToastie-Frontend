import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NotFound from "../Components/NotFound";

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = process.env.REACT_APP_API_URL;

  
  useEffect(() => {
    fetch(`${apiUrl}/api/Transaction`) // Replace with your API URL
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
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  if (transactions.length === 0) return <NotFound item="Transactions"/>;

console.log(transactions)
  return (
    <div className="container mt-4">
      <h1 className="mb-5 text-center text-primary">Transaction List</h1>
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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.transactionId}>
              <td>{transaction.transactionId}</td>
              <td>{new Date(transaction.transactionDate).toLocaleDateString()}</td>
              <td>${transaction.totalAmount}</td>
              <td>${transaction.discount}</td>
              <td>{transaction.paymentMethod}</td>
              <td>${transaction.taxAmount}</td>
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
};

export default TransactionList;
