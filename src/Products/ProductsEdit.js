import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import DeleteButton from "../Components/DeleteButton";
import NotFound from "../Components/NotFound";

const ProductsEdit = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const navigate = useNavigate(); // For navigation after update
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    BrandName: "",
    weight: "",
    category: "",
    currentStockLevel: "",
    minimumStockLevel: "",
    wholesalePrice: "",
    EAN13Barcode: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const apiUrl = process.env.REACT_APP_API_URL;

  // Fetch product data when the component loads
  useEffect(() => {
    fetch(`${apiUrl}/api/product/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch product details.");
        }
        return response.json();
      })
      .then((data) => {
        setProduct(data); // Set the product data
        setLoading(false); // Stop loading
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Send the updated product to the API (PUT request)
    fetch(`${apiUrl}/api/product/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update product.");
        }
        return response.json();
      })
      .then(() => {
        alert("Product updated successfully!");
        navigate("/"); // Redirect back to the products list
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!product) return <NotFound item="Product"/>;

  const handleDeleteSuccess = () => {
    navigate("/products");
  };

  return (
    <div className="container mt-5">
      <Link to={`/products`} className="btn btn-secondary">
        Back to Products
      </Link>
      <div className="text-align-center">
        <h1>Edit Product:</h1>
        <h1>{product.name}</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="row mt-5">
          <div className="row">
            <div className="col-md-12 m-5">
              <img
                src={`${apiUrl}/${product.imagePath}`}
                alt={product.name}
                width="500"
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="productImage" className="form-label">
                Product Image:
              </label>
            </div>
            <div className="mb-3 col-md-6">
              <input
                type="file"
                className="form-control"
                id="productImage"
                name="productImage"
                onChange={(e) => handleImageChange(e.target.files[0])}
              />
            </div>
          </div>
          <div className="col-md-6">
            <label htmlFor="name" className="form-label">
              Product Name:
            </label>
          </div>

          <div className="mb-3 col-md-6">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={product.name}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <label htmlFor="price" className="form-label">
              Price:
            </label>
          </div>
          <div className="mb-3 col-md-6">
            <input
              type="number"
              className="form-control"
              id="price"
              name="price"
              value={product.price}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <label htmlFor="BrandName" className="form-label">
              Brand Name:
            </label>
          </div>

          <div className="mb-3 col-md-6">
            <input
              type="text"
              className="form-control"
              id="BrandName"
              name="BrandName"
              value={product.brandName}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <label htmlFor="weight" className="form-label">
              Weight
            </label>
          </div>
          <div className="mb-3 col-md-6">
            <input
              type="number"
              className="form-control"
              id="weight"
              name="weight"
              value={product.weight}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <label htmlFor="category" className="form-label">
              Category
            </label>
          </div>
          <div className="mb-3 col-md-6">
            <input
              type="text"
              className="form-control"
              id="category"
              name="category"
              value={product.category_id}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <label htmlFor="currentStockLevel" className="form-label">
              Current Stock Level
            </label>
          </div>

          <div className="mb-3 col-md-6">
            <input
              type="number"
              className="form-control"
              id="currentStockLevel"
              name="currentStockLevel"
              value={product.currentStockLevel}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <label htmlFor="minimumStockLevel" className="form-label">
              Minimum Stock Level:{" "}
            </label>
          </div>
          <div className="mb-3 col-md-6">
            <input
              type="number"
              className="form-control"
              id="minimumStockLevel"
              name="minimumStockLevel"
              value={product.minimumStockLevel}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <label htmlFor="wholesalePrice" className="form-label">
              Wholesale Price
            </label>
          </div>
          <div className="mb-3 col-md-6">
            <input
              type="number"
              className="form-control"
              id="wholesalePrice"
              name="wholesalePrice"
              value={product.wholesalePrice}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <label htmlFor="Price" className="form-label">
              Price:
            </label>
          </div>
          <div className="mb-3 col-md-6">
            <input
              type="number"
              className="form-control"
              id="Price"
              name="Price"
              value={product.price}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <label htmlFor="EAN13Barcode" className="form-label">
              EAN13 Barcode
            </label>
          </div>
          <div className="mb-3 col-md-6">
            <input
              type="text"
              className="form-control"
              id="EAN13Barcode"
              name="EAN13Barcode"
              value={product.eaN13Barcode}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="mb-3 d-flex justify-content-between align-items-center">
          <button type="submit" className="btn btn-primary">
            Save Changes
          </button>

          <DeleteButton
            endpoint= "/api/product"
            id={product.id}
            onDeleteSuccess={handleDeleteSuccess}
          />
        </div>
      </form>
    </div>
  );
};

export default ProductsEdit;
