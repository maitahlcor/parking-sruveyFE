import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return null; // 👈 no mostrar navbar sin sesión

  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true }); // 👈 volver a login
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/">Inicio</Link>
        <Link to="/usuarios">Usuarios</Link>
        <Link to="/locales">Locales</Link>
      </div>
      <div className="navbar-right">
        <span style={{ marginRight: 12 }}>{user?.email || "Usuario"}</span>
        <button className="btn btn-outline" onClick={handleLogout}>Salir</button>
      </div>
    </nav>
  );
}
