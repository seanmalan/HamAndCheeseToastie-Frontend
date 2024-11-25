import React, {useState, useEffect, useContext} from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import DeleteButton from "../Components/DeleteButton";
import NotFound from "../Components/NotFound";
import {AuthContext} from "../Context/AuthContext";

const ProductsEdit = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const navigate = useNavigate(); // For navigation after update
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    brandName: "",
    weight: "",
    categoryName: "",
    currentStockLevel: "",
    minimumStockLevel: "",
    wholesalePrice: "",
    eaN13Barcode: "",

  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const { isAuthenticated, user } = useContext(AuthContext);


  const apiUrl = process.env.REACT_APP_API_URL;

  // Fetch product data when the component loads
  useEffect(() => {
    fetch(`${apiUrl}/product/${id}`)
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
    fetch(`${apiUrl}/product/${id}`, {
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
          navigate("/product");
        })
        .catch((err) => {
          setError(err.message);
        });
  };

  console.log(product);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!product) return <NotFound item="Product" />;

  const handleDeleteSuccess = () => {
    navigate("/products");
  };

  return (
      <div
          className="d-flex justify-content-center align-items-center vh-100"
          style={{ backgroundColor: "#d0e7f9" }}
      >
        <div
            className="p-5 rounded shadow"
            style={{
              backgroundColor: "#f2f2f2",
              maxWidth: "600px",
              width: "100%",
            }}
        >
          <Link to={`/products`} className="btn btn-secondary mb-3">
            Back to Products
          </Link>
          <div className="text-center mb-4">
            <h1 className="text-primary">Edit Product:</h1>
            <h2 className="text-secondary">{product.name}</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <div className="col-md-4">
                <label htmlFor="productImage" className="form-label">
                  Product Image:
                </label>
              </div>
              <div className="col-md-8">
                <img
                    src={`${apiUrl}/${product.imagePath}`}
                    alt={product.name}
                    className="img-fluid mb-3"
                    style={{maxWidth: "100%", height: "auto"}}
                />
                <input
                    type="file"
                    className="form-control"
                    id="productImage"
                    name="productImage"
                    onChange={handleImageChange}
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-4">
                <label htmlFor="name" className="form-label">
                  Product Name:
                </label>
              </div>
              <div className="col-md-8">
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


            <div className="row mb-3">
              <div className="col-md-4">
                <label htmlFor="BrandName" className="form-label">
                  Brand Name:
                </label>
              </div>
              <div className="col-md-8">
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

            <div className="row mb-3">
              <div className="col-md-4">
                <label htmlFor="weight" className="form-label">
                  Weight:
                </label>
              </div>
              <div className="col-md-8">
                <input
                    type="string"
                    className="form-control"
                    id="weight"
                    name="weight"
                    value={product.weight}
                    onChange={handleChange}
                    required
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-4">
                <label htmlFor="category" className="form-label">
                  Category:
                </label>
              </div>
              <div className="col-md-8">
                <input
                    type="text"
                    className="form-control"
                    id="category"
                    name="category"
                    value={product.categoryName}
                    onChange={handleChange}
                    required
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-4">
                <label htmlFor="currentStockLevel" className="form-label">
                  Current Stock Level:
                </label>
              </div>
              <div className="col-md-8">
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

            <div className="row mb-3">
              <div className="col-md-4">
                <label htmlFor="minimumStockLevel" className="form-label">
                  Minimum Stock Level:
                </label>
              </div>
              <div className="col-md-8">
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

            {user.role === 1 || user.role === 2 ? (
            <div className="row mb-3">
              <div className="col-md-4">
                <label htmlFor="price" className="form-label">
                  Price:
                </label>
              </div>
              <div className="col-md-8">
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
            ) : null}
            {user.role === 1 || user.role === 2 ? (
            <div className="row mb-3">
              <div className="col-md-4">
                <label htmlFor="wholesalePrice" className="form-label">
                  Wholesale Price:
                </label>
              </div>
              <div className="col-md-8">
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
            ) : null}

            {user.role === 1 ? (
                <div className="row mb-3">
                  <div className="col-md-4">
                    <label htmlFor="EAN13Barcode" className="form-label">
                      EAN13 Barcode:
                    </label>
                  </div>
                  <div className="col-md-8">
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
            ) : null}

            <div className="mb-3 d-flex justify-content-between align-items-center">
              <DeleteButton productId={id} onDeleteSuccess={handleDeleteSuccess} component={"Product"}/>
              <button type="submit" className="btn btn-primary">
                Update Product
              </button>
            </div>
          </form>


        </div>
      </div>
  );
};


export default ProductsEdit;
