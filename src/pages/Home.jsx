import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="card">
      <h2>Bienvenido</h2>
      <p>Elige una encuesta para comenzar.</p>
      <div className="actions">
        <Link to="/usuarios" className="btn btn-primary">Encuesta de Usuarios</Link>
        <Link to="/locales" className="btn btn-secondary">Encuesta de Locales</Link>
      </div>
    </section>
  );
}
