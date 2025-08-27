// src/pages/Usuarios.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // 👈 NUEVO
import Survey from "../components/Survey";
import preguntasUsuarios from "../data/preguntasUsuarios.json";
import { crearEncuesta, finalizarEncuesta, getCoords } from "../api/encuestas";

// util para convertir answers en arreglo
function aArregloDeRespuestas(answers, questions) {
  const out = [];
  for (const q of questions) {
    const val = answers[q.name];
    if (val == null) continue;

    if (q.type === "ranking" && typeof val === "object") {
      for (const [choice, rank] of Object.entries(val)) {
        out.push({ name: q.name, title: `${q.title} · ${choice}`, type: q.type, value: rank });
      }
    } else {
      out.push({ name: q.name, title: q.title, type: q.type, value: val });
    }
  }
  return out;
}

export default function Usuarios() {
  const [esPrueba, setEsPrueba] = useState(null);       // "Sí" | "No"
  const [tieneVehiculo, setTieneVehiculo] = useState(null); // "Sí" | "No"
  const [enviando, setEnviando] = useState(false);
  const [lastCoords, setLastCoords] = useState(null);

  const navigate = useNavigate(); // 👈 NUEVO

  const enviarSinVehiculo = async () => {
    setEnviando(true);
    try {
      const coords = await getCoords().catch(() => null);
      if (coords) setLastCoords(coords);

      const { encuestaId } = await crearEncuesta({
        tipo: "usuario",
        esPrueba: esPrueba === "Sí",
        coords,
      });

      const respuestas = [
        { name: "es_prueba", title: "¿Es una prueba?", type: "radiogroup", value: esPrueba || "No" },
        { name: "vehiculo_privado", title: "¿Tiene vehículo privado?", type: "radiogroup", value: "No" },
      ];

      await finalizarEncuesta(encuestaId, respuestas);
      alert("¡Encuesta (sin vehículo) enviada!");
      navigate("/", { replace: true }); // 👈 Vuelve a Home
    } catch (e) {
      console.error(e);
      alert(e.message || "Error enviando");
    } finally {
      setEnviando(false);
    }
  };

  const enviarConVehiculo = async (answers) => {
    setEnviando(true);
    try {
      const coords = await getCoords().catch(() => null);
      if (coords) setLastCoords(coords);

      const { encuestaId } = await crearEncuesta({
        tipo: "usuario",
        esPrueba: esPrueba === "Sí",
        coords,
      });

      const extra = [
        { name: "es_prueba", title: "¿Es una prueba?", type: "radiogroup", value: esPrueba || "No" },
        { name: "vehiculo_privado", title: "¿Tiene vehículo privado?", type: "radiogroup", value: "Sí" },
      ];
      const respuestas = [...extra, ...aArregloDeRespuestas(answers, preguntasUsuarios)];

      await finalizarEncuesta(encuestaId, respuestas);
      alert("¡Encuesta enviada!");
      navigate("/", { replace: true }); // 👈 Vuelve a Home
    } catch (e) {
      console.error(e);
      alert(e.message || "Error enviando");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div>
      <h1>Encuesta de Usuarios</h1>

      {/* Pregunta fija 1 */}
      <div className="question">
        <label className="question-title">¿Es una prueba?</label>
        <div className="radiogroup horizontal">
          <label><input type="radio" name="esPrueba" value="Sí" checked={esPrueba==="Sí"} onChange={()=>setEsPrueba("Sí")} /> Sí</label>
          <label><input type="radio" name="esPrueba" value="No" checked={esPrueba==="No"} onChange={()=>setEsPrueba("No")} /> No</label>
        </div>
      </div>

      {/* Pregunta fija 2 */}
      <div className="question">
        <label className="question-title">¿Tiene vehículo privado? (Si no, finalizar encuesta)</label>
        <div className="radiogroup horizontal">
          <label><input type="radio" name="vehiculo" value="Sí" checked={tieneVehiculo==="Sí"} onChange={()=>setTieneVehiculo("Sí")} /> Sí</label>
          <label><input type="radio" name="vehiculo" value="No" checked={tieneVehiculo==="No"} onChange={()=>setTieneVehiculo("No")} /> No</label>
        </div>
      </div>

      {tieneVehiculo === "No" && (
        <div className="card" style={{ marginTop: 16 }}>
          <p>Gracias por su tiempo, no necesita continuar.</p>
          <button className="submit-btn" onClick={enviarSinVehiculo} disabled={enviando || !esPrueba}>
            {enviando ? "Enviando..." : "Enviar"}
          </button>
          {lastCoords && (
            <p className="muted" style={{ marginTop: 8 }}>
              Última ubicación: <strong>{lastCoords.lat.toFixed(6)}, {lastCoords.lng.toFixed(6)}</strong> · {Math.round(lastCoords.accuracy || 0)} m
            </p>
          )}
        </div>
      )}

      {tieneVehiculo === "Sí" && (
        <Survey
          questions={preguntasUsuarios}
          onSubmit={enviarConVehiculo}
          disabled={enviando || !esPrueba}
          lastCoords={lastCoords}
        />
      )}
    </div>
  );
}
