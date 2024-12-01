import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import DeleteButton from "../Components/DeleteButton";
import NotFound from "../Components/NotFound";
import { AuthContext } from "../Context/AuthContext";

const ProductsEdit = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const navigate = useNavigate(); // For navigation after update
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    brandName: "",
    weight: "",
    categoryId: "", // Make sure this is initialized
    categoryName: "", // And this
    currentStockLevel: "",
    minimumStockLevel: "",
    wholesalePrice: "",
    eaN13Barcode: "",
  });
  const [categories, setCategories] = useState([]);
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
        console.log(`fetch product data: ${data}`);
        setProduct(data); // Set the product data
        setLoading(false); // Stop loading
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    fetch(`${apiUrl}/Category`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched categories:", data);
        setCategories(data);
      })
      .catch((err) => setError(err.message));
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "categoryId") {
      const selectedCategory = categories.find(
        (cat) => cat.categoryId === parseInt(value)
      );
      setProduct((prev) => ({
        ...prev,
        categoryId: parseInt(value),
        categoryName: selectedCategory ? selectedCategory.name : "",
      }));
    } else {
      setProduct((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  // Handle form submission
  const preventScroll = (e) => {
    e.preventDefault();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a copy of the product object with proper casing and data types
    const productToSend = {
      ID: parseInt(id),
      Name: product.name,
      BrandName: product.brandName,
      Weight: product.weight,
      CategoryId: product.categoryId ? parseInt(product.categoryId) : null,
      CurrentStockLevel: parseInt(product.currentStockLevel),
      MinimumStockLevel: parseInt(product.minimumStockLevel),
      Price: parseFloat(product.price),
      WholesalePrice: parseFloat(product.wholesalePrice),
      EAN13Barcode: product.eaN13Barcode,
    };

    console.log("Product being sent:", productToSend); // Debug log

    // Create FormData object
    const formData = new FormData();
    formData.append("product", JSON.stringify(productToSend));

    if (imageFile) {
      formData.append("imageFile", imageFile);
    }

    // Send the updated product to the API
    fetch(`${apiUrl}/product/${id}`, {
      method: "PUT",
      credentials: "include",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(`Failed to update product: ${text}`);
          });
        }
        return response.json().catch(() => ({})); // Handle empty response
      })
      .then(() => {
        alert("Product updated successfully!");
        navigate("/products/" + id);
      })
      .catch((err) => {
        setError(err.message);
        console.error("Update error:", err);
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
      className="vh-100 d-flex flex-column"
      style={{ backgroundColor: "#d0e7f9" }}
    >
      <div className="container py-4 flex-grow-1" style={{ overflowY: "auto" }}>
        <div
          className="p-5 rounded shadow mx-auto"
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
                  src={`${apiUrl}${product.imagePath}`}
                  alt={product.name}
                  className="img-fluid mb-3"
                  style={{ maxWidth: "100%", height: "auto" }}
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
                <label htmlFor="brandName" className="form-label">
                  Brand Name:
                </label>
              </div>
              <div className="col-md-8">
                <input
                  type="text"
                  className="form-control"
                  id="brandName"
                  name="brandName"
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
                <label htmlFor="categoryId" className="form-label">
                  Category:
                </label>
              </div>
              <div className="col-md-8">
                <select
                  className="form-control"
                  id="categoryId"
                  name="categoryId"
                  value={product.categoryId || ""}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option
                      key={category.categoryId}
                      value={category.categoryId}
                    >
                      {category.name}
                    </option>
                  ))}
                </select>
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
                  onWheel={preventScroll} // Add this
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
                  onWheel={preventScroll}
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
                    onWheel={preventScroll}
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
                    onWheel={preventScroll}
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
              <DeleteButton
                productId={id}
                onDeleteSuccess={handleDeleteSuccess}
                component={"Product"}
              />
              <button type="submit" className="btn btn-primary">
                Update Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductsEdit;
