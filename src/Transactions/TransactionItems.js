import React from "react";
import { Link, useLocation } from "react-router-dom";

function TransactionItems() {
  const location = useLocation();
  const items = location.state?.items || [];

  console.log(items);

  return (
    <div className="container">
      <h2>Transaction Items</h2>
      {items.length === 0 ? (
        <p>No items found for this transaction.</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Product Name</th>
              <th>Brand Name</th>
              <th>Quantity</th>
              <th>Weight</th>
              <th>Total Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td>{item.productId || "N/A"}</td>
                <td>{item.product?.name || "Unknown"}</td>
                <td>{item.product?.brandName || "Unknown"}</td>
                <td>{item.quantity}</td>
                <td>{item.product?.weight || "Unknown"}</td>
                <td>${item.unitPrice || "0.00"}</td>
                <td>
                  <Link to={`/products/${item.product?.id}`}>View Product</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TransactionItems;
