import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import NotFound from "../Components/NotFound";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [editCategoryName, setEditCategoryName] = useState("");
  const [newCategoryName, setNewCategoryName] = useState("");
  const navigate = useNavigate();

  const apiUrl = process.env.REACT_APP_API_URL;


  useEffect(() => {
    fetch(`${apiUrl}/api/Category`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setCategories(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

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
  };

  const handleDelete = (id) => {
    fetch(`${apiUrl}/api/Category/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete category.");
        }
        setCategories((prevCategories) =>
          prevCategories.filter((cat) => cat.id !== id)
        );
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const handleAddCategory = () => {
    const newCategory = { name: newCategoryName };
    fetch(`${apiUrl}/api/Category`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCategory),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add category.");
        }
        return response.json();
      })
      .then((data) => {
        setCategories((prevCategories) => [...prevCategories, data]);
        setNewCategoryName(""); // Clear the input field
      })
      .catch((error) => {
        setError(error);
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
            key={Category.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {editCategoryId === Category.id ? (
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
                to={`/Categories/${Category.id}`}
                className="btn btn-primary btn-sm"
              >
                View
              </Link>
              {editCategoryId === Category.id ? (
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
                  onClick={() => handleEdit(Category.id)}
                >
                  Edit
                </button>
              )}
              <button
                type="button"
                className="btn btn-danger btn-sm"
                onClick={() => handleDelete(Category.id)}
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
