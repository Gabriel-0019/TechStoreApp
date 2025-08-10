const API_URL = import.meta.env.VITE_API_URL;

export const GetCategories = async () => {
  const response = await fetch(`${API_URL}api/Category`, {
    method: "GET",
  });

  return await response.json();
};

export const AddCategory = async (category) => {
  const response = await fetch(`${API_URL}api/Category`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(category),
  });

  return await response.json();
};

export const EditCategory = async (category) => {
  const response = await fetch(`${API_URL}api/Category`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(category),
  });

  return await response.json();
};
