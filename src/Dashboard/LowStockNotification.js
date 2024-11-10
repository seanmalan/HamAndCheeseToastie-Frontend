import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function LowStockNotification() {
  const [lowStockProducts, setLowStockProducts] = useState([]); // State to hold low stock products
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const apiUrl = process.env.REACT_APP_API_URL; // Get API URL from .env

  useEffect(() => {
    if (!apiUrl) {
      setError("API URL is not defined.");
      setLoading(false);
      return;
    }

    fetch(`${apiUrl}/api/Dashboard/available_products_levels`) // Fetch product stock levels from the API
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch product stock levels.");
        }
        return response.json();
      })
      .then((data) => {
        // Assuming data is an array of products with properties: id, name, currentStockLevel, and minimumStockLevel
        console.log(data);

        setLowStockProducts(data); // Set low stock products
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
    <div>
      {lowStockProducts.length > 0 ? (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Current Stock</th>
              <th>Minimum Stock</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {lowStockProducts.map((product) => (
              <tr key={product.productId}>
                <td>{product.productId}</td>
                <td>{product.productName}</td>
                <td>{product.currentStockLevel}</td>
                <td>{product.minimumStockLevel}</td>
                <td>
                  <Link
                    to={`/products/${product.productId}`}
                    className="btn btn-primary btn-sm"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No low stock notifications at this time.</div>
      )}
    </div>
  );
}

export default LowStockNotification;
