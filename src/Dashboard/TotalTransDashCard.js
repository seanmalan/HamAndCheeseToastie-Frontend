import React, { useEffect, useState } from "react";

function TotalTransactionsDashboard() {
  const [totalTransactions, settotalTransactions] = useState(0); // State to hold total sales
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const apiUrl = process.env.REACT_APP_API_URL; // Get API URL from .env

  useEffect(() => {
    if (!apiUrl) {
      setError("API URL is not defined.");
      setLoading(false);
      return;
    }

    fetch(`${apiUrl}/api/Dashboard/total_transactions`) // Fetch total transactions from the API
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch total transactions.");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data)
        settotalTransactions(data); // Populate the total sales
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
    <div className="card text-center">
      <div className="card-body">
        <h5 className="card-title">Total Transactions:</h5>
        <p className="card-text">{totalTransactions}</p>
      </div>
    </div>
  );
}

export default TotalTransactionsDashboard;
