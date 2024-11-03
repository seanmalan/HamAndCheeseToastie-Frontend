import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is imported
import { Link } from "react-router-dom";
import NotFound from "../Components/NotFound";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL;


  useEffect(() => {
    // Fetch data from the C# API using the fetch API
    fetch(`${apiUrl}/api/product`)
      // fetch("http://10.0.0.1:8080/api/product")
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Convert response to JSON
      })
      .then((data) => {
        setProducts(data); // Update products state with the data
        setLoading(false); // Stop loading once data is fetched
      })
      .catch((error) => {
        setError(error); // If an error occurs, catch it and update the error state
        setLoading(false); // Stop loading even if there was an error
      });
  }, []);

  // Handle loading, error, and data display states
  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center">Error: {error.message}</div>;

  // If no products are found, display a 404 Not Found page
  if (products.length === 0) return <NotFound item="Products"/>;

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="row text-center">
        <Link to={`/`} className="btn btn-secondary mb-3">
          Back to Dashboard
        </Link>
        <h1 className="mb-5">List of Products</h1>
        {products.map((product) => (
          <div className="col-12 col-md-6 col-lg-4 mb-4" key={product.id}>
            <div className="card h-100">
              <div className="card-body">
                {product.imagePath && (
                  <img
                    src={`${apiUrl}/${product.imagePath}`}
                    alt={product.name}
                    width="200"
                  />
                )}
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">${product.price.toFixed(2)}</p>

                <Link
                  to={`/products/${product.id}`}
                  className="btn btn-primary"
                >
                  View Product
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
