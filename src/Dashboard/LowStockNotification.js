import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function LowStockNotification() {
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    if (!apiUrl) {
      setError("API URL is not defined.");
      setLoading(false);
      return;
    }

    fetch(`${apiUrl}/api/Dashboard/available_products_levels`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch product stock levels.");
        }
        return response.json();
      })
      .then((data) => {
        setLowStockProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [apiUrl]);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-danger">{error}</div>;
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
