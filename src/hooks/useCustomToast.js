// hooks/useCustomToast.js
import { toast } from "react-toastify";

export const useCustomToast = () => {
  const toastConfig = {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  };

  const messages = {
    success: (entity) => `${entity} Updated Successfully`,
    error: (entity) => `Error Updating ${entity}`,
    warning: (entity) => `Warning: ${entity} Update Issues`,
    delete: (entity) => `${entity} Deleted Successfully`,
    create: (entity) => `${entity} Created Successfully`,
  };

  const showToast = (
    entityType,
    status = "success",
    customMessage = "",
    customConfig = {}
  ) => {
    const message = customMessage || messages[status](entityType);
    const config = { ...toastConfig, ...customConfig };

    switch (status) {
      case "success":
      case "create":
        toast.success(message, config);
        break;
      case "error":
        toast.error(message, config);
        break;
      case "warning":
        toast.warning(message, config);
        break;
      case "delete":
        toast.success(message, config);
        break;
      default:
        toast.info(message, config);
    }
  };

  return { showToast };
};
