import { createContext, useState } from "react";
import { Login } from "../api/auth/auth";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = async (email, password) => {
    setLoading(true);
    try {
      const user = await Login(email, password);
      setUser(user);
      navigate("/");
    } catch {
      throw new Error("Credenciales incorrectas");
    } finally {
      setLoading(false);
    }
  };

  let data = {
    login,
    loading,
    user,
  };
  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};
