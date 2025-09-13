import { createContext, useEffect, useState } from "react";
import { Login } from "../api/auth/auth";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

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

  const logout = () => {
    setLoading(true);
    setUser(null);
    setLoading(false);
  };

  let data = {
    login,
    loading,
    user,
    logout,
  };
  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};
