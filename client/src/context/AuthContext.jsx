import React, { createContext, useState, useContext, useEffect } from "react";
import api from "../api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token =
      localStorage.getItem("token") || localStorage.getItem("royalphotography_token");
    if (token) {
      api
        .get("/auth/me")
        .then((res) => setUser(res.data.user))
        .catch(() => {
          localStorage.removeItem("token");
localStorage.removeItem("royalphotography_token");
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    const userData = {
      _id: res.data._id,
      name: res.data.name,
      email: res.data.email,
      role: res.data.role,
    };
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("royalphotography_token", res.data.token);
    localStorage.setItem("royalphotography_user", JSON.stringify(userData));
    setUser(userData);
    return res.data;
  };

  const register = async (name, email, password) => {
    const res = await api.post("/auth/register", { name, email, password });
    const userData = {
      _id: res.data._id,
      name: res.data.name,
      email: res.data.email,
      role: res.data.role,
    };
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("royalphotography_token", res.data.token);
    localStorage.setItem("royalphotography_user", JSON.stringify(userData));
    setUser(userData);
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("royalphotography_token");
    localStorage.removeItem("royalphotography_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
