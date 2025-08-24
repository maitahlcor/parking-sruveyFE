import { useState } from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Locales() {
  const [form, setForm] = useState({ l1: "" });
  const navigate = useNavigate();

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    await api.post("/locales", { respuestas: form });
    alert("Guardado");
    navigate("/");
  };

  return (
    <section className="card">
      <h2>Encuesta: Locales</h2>

      <form onSubmit={onSubmit} className="form">
        <div className="field">
          <label>¿El parqueadero de su local es suficiente?</label>
          <select name="l1" onChange={onChange} required>
            <option value="">Seleccione...</option>
            <option>Siempre</option>
            <option>A veces</option>
            <option>Nunca</option>
          </select>
        </div>

        <div className="actions end">
          <button type="button" className="btn" onClick={() => navigate("/")}>Cancelar</button>
          <button type="submit" className="btn btn-primary">Guardar</button>
        </div>
      </form>
    </section>
  );
}
