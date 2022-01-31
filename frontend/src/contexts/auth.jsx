import React, { useState, useEffect, createContext } from "react";
import { api, createSession } from "../services/api";
import { useNavigate } from "react-router-dom";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (user && token) {
      console.log(user + " " + token);
      setUser(JSON.parse(user));
      api.defaults.headers.Authorization = `Bearer ${token}`;
      console.log( api.defaults.headers.Authorization)
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await createSession(email, password);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("token", response.data.token);
      api.defaults.headers.Authorization = `Bearer ${response.data.token}`;
      setUser(response.data.user);
      setLoading(false);
      navigate("/");
    } catch (e) {
      console.log(e.message);
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    api.defaults.headers.Authorization = null;
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ authenticated: !!user, user, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
