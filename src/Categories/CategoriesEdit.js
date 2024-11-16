import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import NotFound from '../Components/NotFound';

function CategoriesEdit() {
  const { id } = useParams(); // Get id from URL
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = process.env.REACT_APP_API_URL;


  // Fetch products linked to this id
  useEffect(() => {
    fetch(`${apiUrl}/api/category/${id}`)
      .then((response) => {
        if (!response.ok) {
          console.log(response);
          throw new Error('Failed to fetch products for this category.');
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

  console.log(products);

  
  return (
      <div className="page">
        <div className="form-container">
          <Link to={`/categories`} className="btn btn-secondary">
            Back to Categories
          </Link>

          {products.categoryName}
          <h1>Products in Category {id}</h1>
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
              <p>No products found for this category.</p>
          )}
        </div>
      </div>
        );
        }

        export default CategoriesEdit;
