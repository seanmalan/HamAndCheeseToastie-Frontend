const apiUrl = process.env.REACT_APP_API_URL; // Get API URL from .env

export const getProtectedData = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${apiUrl}/protected-endpoint`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Attach the token here
    },
  });

  if (!response.ok) throw new Error("Failed to fetch protected data");
  return response.json();
};
