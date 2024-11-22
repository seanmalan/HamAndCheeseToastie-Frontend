import React from "react";

const DeleteButton = ({ endpoint, id, onDeleteSuccess, component }) => {
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete this item: ${component}?`
    );

    const apiUrl = process.env.REACT_APP_API_URL;

    if (!confirmDelete) return;

    const token = localStorage.getItem("token"); // Get the token from storage
    if (!token) {
      alert("No authentication token found. Please log in.");
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/${endpoint}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Add the Authorization header
        },
      });

      if (response.ok) {
        alert(`${component} deleted successfully!`);

        // Call the callback function if provided, to update UI after deletion
        if (onDeleteSuccess) {
          onDeleteSuccess(id);
        }
      } else {
        alert(`Failed to delete the ${component}.`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <button className="btn btn-danger" onClick={handleDelete}>
      Delete {component}
    </button>
  );
};

export default DeleteButton;
