import { createContext, useContext, useEffect, useState } from "react";
import { me, login as apiLogin, logout as apiLogout } from "../api/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true); // para evitar “flash” de UI

  useEffect(() => {
    // Al cargar la app, preguntamos al backend si hay sesión
    (async () => {
      try {
        const u = await me();
        setUser(u?.user || u); // según tu respuesta de /auth/me
      } catch {
        setUser(null);
      } finally {
        setChecking(false);
      }
    })();
  }, []);

  const login = async (email, password) => {
    const u = await apiLogin(email, password);
    setUser(u?.user || u);
    return u;
  };

  const logout = async () => {
    try { await apiLogout(); } catch {}
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, checking, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
