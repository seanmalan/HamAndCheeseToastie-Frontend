import React from 'react';
import ProductList from './ProductList'; // Make sure the import path is correct

const ProductsHome = () => {

    console.log('ProductsHome component rendered');
    return (
        <div>
            <h1>Products</h1>
            <ProductList /> {/* Render the ProductList here */}
        </div>
    );
};

export default ProductsHome;
