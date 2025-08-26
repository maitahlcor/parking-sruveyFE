import { createContext, useContext, useEffect, useState } from "react";
import { me, logout as doLogout } from "../services/auth";

const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      const u = await me();
      setUser(u);
      setReady(true);
    })();
  }, []);

  function logout() {
    doLogout();
    setUser(null);
  }

  return (
    <AuthCtx.Provider value={{ user, setUser, logout, ready }}>
      {children}
    </AuthCtx.Provider>
  );
}

export function useAuth() {
  return useContext(AuthCtx);
}
