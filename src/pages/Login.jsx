import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(form);
      navigate("/"); // a donde quieras
    } catch (err) {
      setError(err.message || "No se pudo iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card auth-card">
  <h2>Ingresar</h2>
  {error && <div className="alert">{error}</div>}
  <form onSubmit={onSubmit}>
    <div className="form-field">
      <label>Correo</label>
      <input type="email" name="email" value={form.email} onChange={onChange} required />
    </div>
    <div className="form-field">
      <label>Contraseña</label>
      <input type="password" name="password" value={form.password} onChange={onChange} required />
    </div>
    <button className="button" type="submit" disabled={loading}>
      {loading ? "Ingresando…" : "Ingresar"}
    </button>
  </form>
</div>

  );
}
