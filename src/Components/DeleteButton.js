import React from "react";

const DeleteButton = ({ endpoint, id, onDeleteSuccess, component }) => {
  const handleDelete = async (e) => {
    e.preventDefault();
    const confirmDelete = window.confirm(
      `Are you sure you want to delete this item: ${component}?`
    );

    if (!confirmDelete) return;

    const apiUrl = process.env.REACT_APP_API_URL;
    const token = localStorage.getItem("token");

    if (!token) {
      alert("No authentication token found. Please log in.");
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/api/${endpoint}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 204) {
        // Success case: No Content
        alert(`${component} deleted successfully!`);
        if (onDeleteSuccess) {
          onDeleteSuccess(id); // Pass the ID to the callback if needed
        }
        return;
      }

      if (!response.ok) {
        // Handle non-204 error responses
        const errorMessage = await response.text(); // Read error body, if available
        throw new Error(
          errorMessage ||
            `Failed to delete ${component} (Status: ${response.status})`
        );
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <button className="btn btn-danger" onClick={handleDelete}>
      Delete {component}
    </button>
  );
};

export default DeleteButton;
