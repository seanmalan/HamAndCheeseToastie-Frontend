import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import NotFound from "../Components/NotFound";

const TransactionList = () => {
  const { id } = useParams();
  const [transactions, setTransactions] = useState([]);
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL;
  const url = `${apiUrl}/Customer/${id}/transactions`;

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
        setTransactions(data.transactions);
        setCustomer(data.customer);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [url]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mt-4 ">
      <Link to={`/customers/${id}`} className="btn btn-secondary mb-4">
        Back to Customer
      </Link>
      <h1 className="mb-1 text-center">Transaction List</h1>
      {customer && (
        <p className="text-center">
          Customer: {customer.firstName} {customer.lastName}
        </p>
      )}
      {transactions.length === 0 ? (
        <NotFound item="Transactions" />
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Date</th>
              <th>Total Amount</th>
              <th>Discount</th>
              <th>Payment Method</th>
              <th>Tax Amount</th>
              <th>Cashier ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.transactionId}>
                <td>
                  {new Date(transaction.transactionDate).toLocaleDateString()}
                </td>
                <td>${transaction.totalAmount}</td>
                <td>${transaction.discount}</td>
                <td>{transaction.paymentMethod}</td>
                <td>${transaction.taxAmount}</td>
                <td>{transaction.cashierId}</td>
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
      )}
    </div>
  );
};

export default TransactionList;
