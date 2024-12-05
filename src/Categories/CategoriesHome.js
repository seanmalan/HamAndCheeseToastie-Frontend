import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import NotFound from "../Components/NotFound";
import { useCustomToast } from "../hooks/useCustomToast";
import { useConfirmation } from "../hooks/useConfirmation";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [editCategoryName, setEditCategoryName] = useState("");
  const [newCategoryName, setNewCategoryName] = useState("");
  const navigate = useNavigate();

  const apiUrl = process.env.REACT_APP_API_URL;
  const url = `${apiUrl}/Category`;

  const { showToast } = useCustomToast();
  const { showConfirmation } = useConfirmation();

  useEffect(() => {
    let isMounted = true;

    const fetchWithAuth = (url, options = {}) => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return null;
      }
      return fetch(url, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          ...options.headers,
        },
      });
    };

    const fetchCategories = async () => {
      try {
        const response = await fetchWithAuth(url);
        if (!response) return; // Handle case where fetchWithAuth returns null

        if (response.status === 401) {
          localStorage.removeItem("token"); // Clear invalid token
          navigate("/login");
          return;
        }

        if (!response.ok) {
          showToast("Category", "error", "Failed to fetch categories.", { position: "top-center" });
        }

        const data = await response.json();
        if (isMounted) {
          setCategories(data);
        }
      } catch (error) {
        if (isMounted) {
          setError(error);
          showToast("Category", "error", error.message, { position: "top-center" });
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchCategories();

    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, [url]);

  const handleEdit = (id) => {
    const category = categories.find((cat) => cat.id === id);
    setEditCategoryId(id);
    setEditCategoryName(category.name);
  };

  const handleSaveEdit = () => {
    setCategories((prevCategories) =>
        prevCategories.map((cat) =>
            cat.id === editCategoryId ? { ...cat, name: editCategoryName } : cat
        )
    );
    setEditCategoryId(null);
    showToast("Category", "success", "", { position: "bottom-center" });
  };

  const handleDelete = (id) => {
    showConfirmation("Are you sure you want to delete this category?", () => {
      fetch(`${apiUrl}/Category/${id}`, {
        method: "DELETE",
      })
          .then((response) => {
            if (!response.ok) {
              showToast("Category", "error", "Failed to delete category.", { position: "bottom-center" });
            }
            setCategories((prevCategories) =>
                prevCategories.filter((cat) => cat.id !== id)
            );
            showToast("Category", "delete", "", { position: "bottom-center" });
          })
          .catch((err) => {
            setError(err.message);
            showToast("Category", "error", err.message, { position: "bottom-center" });
          });
    });
  };

  const handleAddCategory = () => {
    const newCategory = { name: newCategoryName };
    fetch(`${apiUrl}/Category`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCategory),
    })
        .then((response) => {
          if (!response.ok) {
            showToast("Category", "error", "Failed to add category.", { position: "bottom-center" });
          }
          return response.json();
        })
        .then((data) => {
          setCategories((prevCategories) => [...prevCategories, data]);
          setNewCategoryName(""); // Clear the input field
          showToast("Category", "create", "", { position: "bottom-center" });
        })
        .catch((error) => {
          setError(error);
          showToast("Category", "error", error.message, { position: "bottom-center" });
        });
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center">Error: {error.message}</div>;
  if (categories.length === 0) return <NotFound item="Categories" />;
  

  return (
      <div className="container">
        <Link to={`/`} className="btn btn-secondary mb-4">
          Back to Dashboard
        </Link>
        <h1 className="mb-4">List of Categories</h1>

        {/* Form to Add New Category */}
        <div className="mb-4">
          <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="New Category Name"
              className="form-control d-inline-block"
              style={{ width: "250px" }}
          />
          <button
              type="button"
              className="btn btn-primary ms-2"
              onClick={handleAddCategory}
          >
            Add Category
          </button>
        </div>

        <ul className="list-group p-4">
          {categories.map((Category) => (
              <li
                  key={Category.categoryId}
                  className="list-group-item d-flex justify-content-between align-items-center"
              >
                {editCategoryId === Category.categoryId ? (
                    <input
                        type="text"
                        value={editCategoryName}
                        onChange={(e) => setEditCategoryName(e.target.value)}
                        className="form-control"
                        style={{ maxWidth: "250px" }}
                    />
                ) : (
                    <span>{Category.name}</span>
                )}
                <div className="btn-group">
                  <Link
                      to={{
                        pathname: `/Categories/${Category.categoryId}`,
                        state: { categoryName: Category.name } // Pass the category name
                      }}
                      className="btn btn-primary btn-sm"
                  >
                    View
                  </Link>
                  {editCategoryId === Category.categoryId ? (
                      <button
                          type="button"
                          className="btn btn-success btn-sm"
                          onClick={handleSaveEdit}
                      >
                        Save
                      </button>
                  ) : (
                      <button
                          type="button"
                          className="btn btn-warning btn-sm"
                          onClick={() => handleEdit(Category.categoryId)}
                      >
                        Edit
                      </button>
                  )}
                  <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(Category.categoryId)}
                  >
                    Delete
                  </button>
                </div>
              </li>
          ))}
        </ul>
      </div>
  );
};

export default CategoryList;
