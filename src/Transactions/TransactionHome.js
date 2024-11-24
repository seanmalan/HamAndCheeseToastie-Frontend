import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import NotFound from "../Components/NotFound";
import NZDateFormatter from "../Components/DateFormat";
import PaymentMethod from "./Components/PaymentMethod";

const TransactionList = () => {
  // State hooks for storing transactions, loading state, error messages, and date range
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const apiUrl = process.env.REACT_APP_API_URL;

  // The fetchTransactions function is wrapped with useCallback to avoid re-definition on every render
  // This is crucial to avoid causing unnecessary rerenders or API calls if dependencies haven't changed.
  const fetchTransactions = useCallback(() => {
    setLoading(true);

    // Build query parameters based on the selected dates
    const queryParams = new URLSearchParams();
    if (dateFrom) queryParams.append("dateFrom", dateFrom);
    if (dateTo) queryParams.append("dateTo", dateTo);

    // Fetch the transactions from the API
    fetch(`${apiUrl}/Transaction?${queryParams.toString()}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setTransactions(data); // Set the response data (transactions)
        setLoading(false); // Set loading to false when done
      })
      .catch((error) => {
        setError(error); // Set error state if something goes wrong
        setLoading(false); // Also stop the loading state
      });
  }, [apiUrl, dateFrom, dateTo]); // Only re-create this function if apiUrl, dateFrom, or dateTo change.

  // useEffect hook will fetch transactions only when apiUrl, dateFrom, or dateTo change.
  // If the dateFrom or dateTo changes, fetchTransactions will be triggered again.
  useEffect(() => {
    fetchTransactions(); // Calls fetchTransactions when the dates change
  }, [fetchTransactions]); // Only run fetchTransactions when fetchTransactions is updated (i.e., apiUrl, dateFrom, or dateTo change).

  // Handle filter button click to refresh transactions
  const handleFilter = () => {
    fetchTransactions(); // Trigger the transaction fetching process when the user applies the filter
  };

  // Logging the fetched transactions for debugging purposes
  console.log(transactions);

  // If loading, display loading message
  if (loading) return <div>Loading...</div>;

  // If there's an error in the fetch request, display error message
  if (error) return <div>Error: {error.message}</div>;

  // If no transactions are found, display a "Not Found" component
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
              onChange={(e) => setDateFrom(e.target.value)} // Update dateFrom state when the user selects a start date
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
              onChange={(e) => setDateTo(e.target.value)} // Update dateTo state when the user selects an end date
              className="form-control d-inline-block w-auto"
            />
          </label>
        </div>
      </div>
      <div className="col">
        <button className="btn btn-primary mt-3" onClick={handleFilter}>
          Filter
        </button>
      </div>
      {/* Transaction Table */}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Total Amount</th>
            <th>Discount</th>
            <th>Tax Amount</th>
            <th>Payment Method</th>
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
              <td>${transaction.taxAmount.toFixed(2)}</td>
              <td>
                <PaymentMethod paymentMethod={transaction.paymentMethod} />
              </td>
              <td>
                <Link to={`/users/${transaction.userId}`}>
                  {transaction.userId}
                </Link>
              </td>
              <td>
                <Link to={`/Customers/${transaction.customer.customerId}`}>
                  {transaction.customer.firstName +
                    " " +
                    transaction.customer.lastName}
                </Link>
              </td>
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
