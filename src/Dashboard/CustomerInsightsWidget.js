import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NZDateFormatter from "../Components/DateFormat";

function CustomerInsightsWidget() {
  const [customerInsights, setCustomerInsights] = useState(0); // State to hold total sales
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const apiUrl = process.env.REACT_APP_API_URL; // Get API URL from .env

  useEffect(() => {
    if (!apiUrl) {
      setError("API URL is not defined.");
      setLoading(false);
      return;
    }

    fetch(`${apiUrl}/Dashboard/customer_insights`) // Fetch total transactions from the API
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch customer insights.");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setCustomerInsights(data); // Populate the total sales
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
      <h1 className="mb-4">Customer Insights</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>FirstName</th>
            <th>LastName</th>
            <th>Email</th>
            <th>Last Shop</th>
            <th>Total Spent</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {customerInsights.map((insight) => (
            <tr key={insight.customerId}>
              <td>{insight.firstName}</td>
              <td>{insight.lastName}</td>
              <td>{insight.email}</td>
              <td>
                <NZDateFormatter date={insight.lastTransactionDate} />
              </td>
              <td>${insight.totalSpent}</td>
              <td>
                <Link
                  to={`/customers/${insight.customerId}/transactions`}
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
}

export default CustomerInsightsWidget;
