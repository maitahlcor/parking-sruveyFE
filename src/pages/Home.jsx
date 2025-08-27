import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="card">
      <h2 className="card-title">Bienvenido</h2>
      <p>Elige una encuesta para comenzar.</p>

      <div className="card-actions">
        <Link to="/usuarios" className="btn btn-primary">
          Encuesta de Usuarios
        </Link>
        <Link to="/locales" className="btn btn-outline">
          Encuesta de Locales
        </Link>
      </div>
    </div>
  );
}
