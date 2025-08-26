import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Layout({ children }) {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  function onLogout() {
    logout();
    nav("/login");
  }

  return (
    <>
      <header className="topbar">
        <Link to="/" className="brand">Encuestas de Parqueo</Link>
        <nav className="menu">
          <NavLink to="/">Inicio</NavLink>
          <NavLink to="/usuarios">Usuarios</NavLink>
          <NavLink to="/locales">Locales</NavLink>
          {!user ? (
            <NavLink to="/login">Login</NavLink>
          ) : (
            <>
              <span className="muted">{user.email}</span>
              <button className="btn-link" onClick={onLogout}>Salir</button>
            </>
          )}
        </nav>
      </header>

      <main className="main">{children}</main>
      <footer className="footer">© 2025 Proyecto Parqueo</footer>
    </>
  );
}
