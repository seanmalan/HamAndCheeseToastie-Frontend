import React from "react";

const DeleteButton = ({ endpoint, id, onDeleteSuccess }) => {
  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this item?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${endpoint}/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Item deleted successfully!");

        // Call the callback function if provided, to update UI after deletion
        if (onDeleteSuccess) {
          onDeleteSuccess(id);
        }
      } else {
        alert("Failed to delete the item.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <button className="btn btn-danger" onClick={handleDelete}>
      Delete
    </button>
  );
};

export default DeleteButton;
