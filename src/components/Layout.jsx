// src/components/Layout.jsx
import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext"
 

export default function Layout() {
  const { user, logout } = useAuth();

  return (
    <>
      <header className="navbar">
        <Link to="/" className="brand">Encuestas de Parqueo</Link>

        <div className="right">
          {user && <span className="email">{user.email}</span>}
          <button className="btn btn-outline btn-sm" onClick={logout}>Salir</button>
        </div>
      </header>

      <main className="container">
        <Outlet />
      </main>

      <footer className="footer">© 2025 Proyecto Parqueo</footer>
    </>
  );
}
