import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { register as apiRegister } from "../api/auth";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const loc = useLocation();
  const navigate = useNavigate();
  const from = loc.state?.from?.pathname || "/";

  const handleLogin = async (e) => {
    e.preventDefault();
    setSending(true);
    setError("");
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (e) {
      setError(e.message || "Error de login");
    } finally {
      setSending(false);
    }
  };

  const handleRegister = async () => {
    setSending(true);
    setError("");
    try {
      await apiRegister(email, password);
      // tras crear, iniciamos sesión automáticamente
      await login(email, password);
      navigate(from, { replace: true });
    } catch (e) {
      setError(e.message || "No se pudo crear la cuenta");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="card auth-card">
        <h2 className="card-title">Ingresar</h2>

        {error && <div className="alert-error">{error}</div>}

        <form onSubmit={handleLogin} className="form-grid">
          <div className="field">
            <label className="label" htmlFor="email">Email</label>
            <input
              id="email"
              className="input"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="tucorreo@dominio.com"
            />
          </div>

          <div className="field">
            <label className="label" htmlFor="password">Contraseña</label>
            <input
              id="password"
              className="input"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
          </div>

          <div className="actions">
            <button className="btn btn-primary" disabled={sending}>
              {sending ? "Procesando..." : "Ingresar"}
            </button>

            <button
              type="button"
              className="btn btn-outline"
              onClick={handleRegister}
              disabled={sending}
              title="Crear un usuario nuevo con este email y contraseña"
            >
              Crear cuenta
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
