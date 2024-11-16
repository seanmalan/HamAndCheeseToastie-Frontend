import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import NotFound from "../Components/NotFound";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [error, setError] = useState(null);
  const [categoriesError, setCategoriesError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;

  const itemsPerPage = 30;

  useEffect(() => {
    fetch(`${apiUrl}/api/product`)
        .then((response) => {
          if (!response.ok)
            throw new Error(
                "Network response was not ok for the product retrieval"
            );
          return response.json();
        })
        .then((data) => {
          setProducts(data);
          setFilteredProducts(data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
  }, [apiUrl]);

  useEffect(() => {
    fetch(`${apiUrl}/api/Category`)
        .then((response) => {
          if (!response.ok)
            throw new Error(
                "Network response was not ok for the categories retrieval"
            );
          return response.json();
        })
        .then((categoryData) => {
          setCategories(categoryData);
          setLoadingCategories(false);
        })
        .catch((error) => {
          setCategoriesError(error);
          setLoadingCategories(false);
        });
  }, [apiUrl]);

  // Handle pagination
  const paginatedProducts = filteredProducts.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Handle filtering by category and search
  useEffect(() => {
    let filtered = products;

    if (selectedCategory) {
      filtered = filtered.filter(
          (product) => product.categoryName === selectedCategory
      );
    }

    if (searchQuery) {
      filtered = filtered.filter((product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [products, selectedCategory, searchQuery]);

  if (loading) return <div className="text-center">Loading...</div>;
  if (loadingCategories) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center">Error: {error.message}</div>;
  if (categoriesError)
    return <div className="text-center">Error: {error.message}</div>;
  if (products.length === 0) return <NotFound item="Products" />;

  return (
      <div className="container mt-5">
        <Link to={`/`} className="btn btn-secondary mb-3">
          Back to Dashboard
        </Link>
        <h1 className="mb-5 text-center text-primary">Products On Record</h1>

        {/* Filter Controls */}
        <div className="row mb-4">
          <div className="col-md-6 col-lg-4">
            <select
                className="form-control form-control-lg"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
              ))}
            </select>
          </div>
          <div className="col-md-6 col-lg-6">
            <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Product Cards */}
        <div className="row g-4">
          {paginatedProducts.map((product) => (
              <div className="col-12 col-md-6 col-lg-4" key={product.id}>
                <div className="card shadow-sm border-light h-100">
                  {product.imagePath && (
                      <img
                          src={`${apiUrl}/${product.imagePath}`}
                          alt={product.name}
                          className="card-img-top"
                          style={{ height: "200px", objectFit: "cover" }}
                      />
                  )}
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text text-muted">${product.price.toFixed(2)}</p>
                    <Link
                        to={`/products/${product.id}`}
                        className="btn btn-primary w-100"
                    >
                      View Product
                    </Link>
                  </div>
                </div>
              </div>
          ))}
        </div>

        {/* Pagination */}
        <nav className="mt-4">
          <ul className="pagination justify-content-center">
            {Array.from(
                { length: Math.ceil(filteredProducts.length / itemsPerPage) },
                (_, index) => (
                    <li
                        className={`page-item ${
                            currentPage === index + 1 ? "active" : ""
                        }`}
                        key={index}
                    >
                      <button
                          className="page-link"
                          onClick={() => handlePageChange(index + 1)}
                      >
                        {index + 1}
                      </button>
                    </li>
                )
            )}
          </ul>
        </nav>
      </div>
  );
};

export default ProductList;
