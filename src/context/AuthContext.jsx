import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext({
  user: null,
  token: null,
  loading: true,
  login: async () => {},
  logout: () => {},
  setUser: () => {},
  setToken: () => {}
});

export function AuthProvider({ children }) {
  const [user, setUser]   = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // hidrata desde localStorage al cargar
  useEffect(() => {
    const t = localStorage.getItem("token");
    const u = localStorage.getItem("user");
    if (t) setToken(t);
    if (u) setUser(JSON.parse(u));
    setLoading(false);
  }, []);

  const login = async ({ email, password }) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:4000"}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    if (!res.ok) throw new Error("Credenciales inválidas");
    const data = await res.json();
    setUser(data.user);
    setToken(data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("token", data.token);
    return data.user;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const value = useMemo(() => ({
    user, token, loading, login, logout, setUser, setToken
  }), [user, token, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
