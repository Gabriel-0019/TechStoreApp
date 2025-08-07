const API_URL = import.meta.env.VITE_API_URL;

export const Login = async (email, password) => {
  const response = await fetch(`${API_URL}api/User/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (data === true) {
    return { success: true };
  }

  throw new Error("Credenciales incorrectas!");
};
