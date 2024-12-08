
import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import NotFound from '../Components/NotFound';

function CategoriesEdit() {
  const { id } = useParams(); // Get id from URL
  const { state } = useLocation(); // Get the passed state (categoryName)
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isNotFound, setIsNotFound] = useState(false);
  const [error, setError] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL;
  
  const categoryName = state ? state.categoryName : "Unknown"; // Default to "Unknown" if no state is passed

  // Fetch products linked to this id
  useEffect(() => {
    setLoading(true);
    setError(null); 
    setIsNotFound(false);
    
    
    fetch(`${apiUrl}/category/${id}`)
        .then((response) => {
            if (!response.ok) {
                if (response.status === 404) {
                    setIsNotFound(true);
                }
                throw new Error("Network response was not ok");
            }
          return response.json();
        })
        .then((data) => {
          setProducts(data); // Set products data
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!products) return <NotFound item="Products" />;

  return (
      <div className="page">
        <div className="form-container">
          <Link to={`/categories`} className="btn btn-secondary">
            Back to Categories
          </Link>

          <h1>Products in Category: {categoryName}</h1>
          {products.length > 0 ? (
              <ul>
                {products.map((product) => (
                    <li key={product.id}>
                      <h2>{product.name}</h2>
                      <p>Brand: {product.brandName}</p>
                      <p>Price: ${product.price}</p>
                      <p>Stock Level: {product.currentStockLevel}</p>

                      <button className="btn btn-primary btn-sm">
                        <Link
                            to={`/Products/${product.id}`}
                            className="btn btn-primary btn-sm"
                        >
                          View
                        </Link>
                      </button>
                    </li>
                ))}
              </ul>
          ) : (
              <NotFound item="products for this category" />
          )}
        </div>
      </div>
  );
}

export default CategoriesEdit;
