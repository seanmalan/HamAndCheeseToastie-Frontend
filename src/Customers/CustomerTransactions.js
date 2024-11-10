import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import NotFound from "../Components/NotFound";

const TransactionList = () => {
  const {id} = useParams();
  const [transactions, setTransactions] = useState([]);
  const [customer, setCustomer] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL;

  
  useEffect(() => {
    fetch(`${apiUrl}/api/Customer/${id}/transactions`) // Replace with your API URL
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setTransactions(data.transactions);
        setCustomer(data.customer);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  console.log(error)

  if (transactions.length === 0) return <NotFound item="Transactions"/>;


  return (
    <div className="container mt-4">
      <h1 className="mb-4">Transaction List</h1>
      customer: {customer.firstName} {customer.lastName}
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
              <td>{new Date(transaction.transactionDate).toLocaleDateString()}</td>
              <td>${transaction.totalAmount}</td>
              <td>${transaction.discount}</td>
              <td>{transaction.paymentMethod}</td>
              <td>${transaction.taxAmount}</td>
              <td>{transaction.cashierId}</td>
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
