import { Link, Outlet, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // ajusta la ruta si la tienes distinta

export default function Layout() {
  const { user, logout } = useAuth();

  return (
    <>
      <header className="topbar">
        <Link to="/" className="brand">Encuestas de Parqueo</Link>

        {/* Sólo el botón de auth, sin navegación */}
        <div className="auth">
          {user ? (
            <>
              <span style={{ marginRight: 8 }}>{user.email}</span>
              <button className="button secondary" onClick={logout}>Salir</button>
            </>
          ) : (
            <NavLink to="/login">Ingresar</NavLink> 
          )}
        </div>
      </header>

      <main className="container">
        <Outlet />
      </main>

      <footer className="footer">© 2025 Proyecto Parqueo</footer>
    </>
  );
}
