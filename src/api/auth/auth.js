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

export const RequestPasswordReset = async (email) => {
  const response = await fetch(
    `${API_URL}api/User/RequestPasswordReset?email=${email}`,
    {
      method: "POST",
    }
  );

  if (response.status === 200) {
    return "Se ha enviado un correo para la verificación.";
  }

  throw new Error("Ocurrió un error al enviar el correo de verificación.");
};

export const ConfirmPassReset = async (token, newPassword) => {
  const response = await fetch(`${API_URL}api/User/ConfirmPassReset`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, newPassword }),
  });

  if (response.status === 204) {
    return "Constraseña actualizada correctamente.";
  }

  if (response.status === 400) {
    const errorData = await response.json();
    const messages = Object.values(errorData.errors).flat();
    throw new Error(messages[0]);
  }

  if (response.status === 401) {
    throw new Error("Token expirado");
  }

  if (response.status === 401) {
    throw new Error("Usuario inválido");
  }

  throw new Error("Ocurrió un error al actualizar la constraseña");
};
