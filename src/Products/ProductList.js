import React, { useState, useEffect } from 'react';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch data from the C# API using the fetch API
        fetch('https://localhost:7276/api/product') // Make sure to use the correct port for your C# backend
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json(); // Convert response to JSON
            })
            .then(data => {
                setProducts(data); // Update products state with the data
                setLoading(false);  // Stop loading once data is fetched
            })
            .catch(error => {
                setError(error);    // If an error occurs, catch it and update the error state
                setLoading(false);  // Stop loading even if there was an error
            });
    }, []);

    // Handle loading, error, and data display states
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    console.log(products); // Check if products are being set correctly


    return (
        <div>
            <h1>Product List</h1>
            <ul>
                {products.map(product => (
                    <li key={product.id}>
                        {product.name} - ${product.price}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;
