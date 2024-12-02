// components/DeleteButton.js
import React from "react";
import { toast } from "react-toastify";
import { useConfirmation } from "../hooks/useConfirmation";

const DeleteButton = ({ endpoint, id, onDeleteSuccess, component }) => {
  const { showConfirmation } = useConfirmation();

  const handleDelete = (e) => {
    e.preventDefault();
    showConfirmation(
      `Are you sure you want to delete this ${component}?`,
      performDelete
    );
  };

  const performDelete = async () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("No authentication token found. Please log in.", {
        position: "top-center",
        autoClose: 5000,
        theme: "colored",
      });
      return;
    }

    const loadingToastId = toast.loading(`Deleting ${component}...`, {
      position: "top-center",
    });

    try {
      const response = await fetch(`${apiUrl}/${endpoint}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      // Dismiss loading toast
      toast.dismiss(loadingToastId);

      if (response.status === 204) {
        if (onDeleteSuccess) {
          onDeleteSuccess(id);
        }
        return;
      }

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(
          errorMessage ||
            `Failed to delete ${component} (Status: ${response.status})`
        );
      }
    } catch (error) {
      toast.error(error.message, {
        position: "top-center",
        autoClose: 5000,
        theme: "colored",
      });
    }
  };

  return (
    <button className="btn btn-danger" onClick={handleDelete}>
      Delete {component}
    </button>
  );
};

export default DeleteButton;
