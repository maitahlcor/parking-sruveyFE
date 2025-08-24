import { Link, useLocation } from "react-router-dom";

export default function Layout({ children }) {
  const { pathname } = useLocation();
  return (
    <div className="app">
      <header className="app-header">
        <h1>Encuestas de Parqueo</h1>
        <nav>
          <Link to="/" className={pathname === "/" ? "active" : ""}>Inicio</Link>
          <Link to="/usuarios" className={pathname === "/usuarios" ? "active" : ""}>Usuarios</Link>
          <Link to="/locales" className={pathname === "/locales" ? "active" : ""}>Locales</Link>
        </nav>
      </header>
      <main className="app-main">{children}</main>
      <footer className="app-footer">© {new Date().getFullYear()} Proyecto Parqueo</footer>
    </div>
  );
}
