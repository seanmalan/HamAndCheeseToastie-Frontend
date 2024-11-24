import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import PaymentMethod from "../Transactions/Components/PaymentMethod";
import NZDateFormatter from "../Components/DateFormat";

function UserTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const apiUrl = process.env.REACT_APP_API_URL;
  const { isAuthenticated, user } = useContext(AuthContext);

  useEffect(() => {
    const fetchUserTransactions = async () => {
      try {
        const token = localStorage.getItem("token"); // Replace with how you store the token

        const response = await fetch(`${apiUrl}/User/${id}/Transactions`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setTransactions(data);
        console.log(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserTransactions();
  }, [id, apiUrl]);

  if (loading) {
    return <div>Loading transactions...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>User Transactions</h1>
      {transactions.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Date</th>
              <th>Payment Method</th>
              <th>Total Amount</th>
              <th>Tax Amount</th>
              <th>User ID</th>
              <th>Transaction Items</th>
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
                <td>
                  <PaymentMethod paymentMethod={transaction.paymentMethod} />
                </td>
                <td>{transaction.totalAmount}</td>
                <td>${transaction.taxAmount}</td>
                <td>{transaction.userId}</td>
                <td>
                  <Link
                    to={`/transactions/${transaction.transactionId}/transactionItems`}
                    state={{ items: transaction.transactionItems }}
                    className="btn btn-secondary"
                  >
                    View Transaction Items
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default UserTransactions;
