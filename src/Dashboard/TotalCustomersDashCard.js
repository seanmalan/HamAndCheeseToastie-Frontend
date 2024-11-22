import React, { useEffect, useState } from "react";

function TotalCustomersDashCard() {
  const [totalSales, setTotalSales] = useState(0); // State to hold total sales
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const apiUrl = process.env.REACT_APP_API_URL; // Get API URL from .env

  useEffect(() => {
    if (!apiUrl) {
      setError("API URL is not defined.");
      setLoading(false);
      return;
    }

    fetch(`${apiUrl}/Dashboard/total_customers`) // Fetch total sales from the API
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch total sales.");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data)
        setTotalSales(data); // Populate the total sales
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
        <h5 className="card-title">Active Customers: </h5>
        <p className="card-text">{totalSales}</p>
      </div>
    </div>
  );
}

export default TotalCustomersDashCard;
