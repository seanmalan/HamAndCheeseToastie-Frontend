// hooks/useConfirmation.js
import { toast } from "react-toastify";

export const useConfirmation = () => {
  const showConfirmation = (message, onConfirm) => {
    toast.warn(
      <div>
        <p>{message}</p>
        <div className="d-flex justify-content-end mt-3">
          <button
            className="btn btn-secondary me-2"
            onClick={() => toast.dismiss()}
          >
            Cancel
          </button>
          <button
            className="btn btn-danger"
            onClick={() => {
              toast.dismiss();
              onConfirm();
            }}
          >
            Delete
          </button>
        </div>
      </div>,
      {
        position: "top-center",
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: false,
        draggable: false,
        closeButton: false,
        theme: "colored",
      }
    );
  };

  return { showConfirmation };
};
