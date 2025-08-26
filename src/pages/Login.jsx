import { useState } from "react";
import { login, register } from "../services/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const nav = useNavigate();
  const { setUser } = useAuth();
  const [mode, setMode] = useState("login"); // "login" | "register"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      const u = mode === "login"
        ? await login(email, password)
        : await register(email, password);
      setUser(u);
      nav("/"); // o /usuarios
    } catch (err) {
      setError(err.message || "Error");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="container">
      <div className="card">
        <h2>{mode === "login" ? "Iniciar sesión" : "Crear cuenta"}</h2>

        <form onSubmit={onSubmit} className="form">
          <label>Correo</label>
          <input
            type="email"
            placeholder="correo@dominio.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Contraseña</label>
          <input
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <div className="error">{error}</div>}

          <button type="submit" disabled={busy}>
            {busy ? "Procesando..." : (mode === "login" ? "Entrar" : "Registrarme")}
          </button>

          <div style={{ marginTop: 12 }}>
            <button
              type="button"
              className="btn-link"
              onClick={() => setMode(m => (m === "login" ? "register" : "login"))}
            >
              {mode === "login" ? "Crear una cuenta" : "Ya tengo cuenta"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
