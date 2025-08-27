import { useState } from "react";
import Survey from "../components/Survey";
import preguntasUsuarios from "../data/preguntasUsuarios.json";
import {
  crearEncuesta,
  guardarRespuestas,
  finalizarEncuesta,
  getCoords,
} from "../api/encuestas";

/**
 * Convierte el objeto de respuestas del Survey en un arreglo listo para el backend.
 * - radiogroup / text / comment / rating: 1 registro por pregunta
 * - checkbox: 1 registro con array de valores
 * - ranking: 1 registro por cada ítem rankeado (choice)
 */
function aArregloDeRespuestas(answers, questions) {
  const out = [];
  for (const q of questions) {
    const val = answers[q.name];
    if (val == null) continue;

    if (q.type === "ranking" && typeof val === "object") {
      // val = { "Costo": "1", "Tiempo": "2", ... }
      for (const [choice, rank] of Object.entries(val)) {
        out.push({
          name: q.name,
          title: `${q.title} · ${choice}`,
          type: q.type,
          value: rank,
        });
      }
    } else {
      out.push({
        name: q.name,
        title: q.title,
        type: q.type,
        value: val, // puede ser string, array (checkbox), número (rating)
      });
    }
  }
  return out;
}

export default function Usuarios() {
  const [esPrueba, setEsPrueba] = useState(null);       // "Sí" | "No" | null
  const [tieneVehiculo, setTieneVehiculo] = useState(null); // "Sí" | "No" | null

  const [enviando, setEnviando] = useState(false);
  const [lastCoords, setLastCoords] = useState(null);   // {lat, lng, accuracy?}

  // Envío cuando NO tiene vehículo: crea encuesta vacía y finaliza
  const enviarSinVehiculo = async () => {
    setEnviando(true);
    try {
      const coords = await getCoords().catch(() => null);
      if (coords) setLastCoords(coords);

      const payload = {
        tipo: "usuario",
        esPrueba: esPrueba === "Sí",
        coords,
        // encuestadorId: (si luego tienes auth, puedes pasarlo aquí)
      };

      const r1 = await crearEncuesta(payload);
      const encuestaId = r1.encuestaId;

      // Sin respuestas
      await finalizarEncuesta(encuestaId);

      alert("¡Encuesta sin vehículo enviada!");
    } catch (err) {
      console.error(err);
      alert(err.message || "Error enviando la encuesta");
    } finally {
      setEnviando(false);
    }
  };

  // Envío cuando SÍ tiene vehículo: usa Survey
  const enviarConVehiculo = async (answers) => {
    setEnviando(true);
    try {
      const coords = await getCoords().catch(() => null);
      if (coords) setLastCoords(coords);

      const payload = {
        tipo: "usuario",
        esPrueba: esPrueba === "Sí",
        coords,
      };

      const r1 = await crearEncuesta(payload);
      const encuestaId = r1.encuestaId;

      const respuestas = aArregloDeRespuestas(answers, preguntasUsuarios);
      if (respuestas.length) {
        await guardarRespuestas(encuestaId, respuestas);
      }

      await finalizarEncuesta(encuestaId);

      alert("¡Encuesta enviada con respuestas!");
    } catch (err) {
      console.error(err);
      alert(err.message || "Error enviando la encuesta");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div>
      <h1>Encuesta de Usuarios</h1>

      {/* Pregunta fija 1: ¿Es una prueba? */}
      <div className="question">
        <label className="question-title">¿Es una prueba?</label>
        <div className="radiogroup horizontal">
          <label>
            <input
              type="radio"
              name="esPrueba"
              value="Sí"
              checked={esPrueba === "Sí"}
              onChange={() => setEsPrueba("Sí")}
            />
            Sí
          </label>
          <label>
            <input
              type="radio"
              name="esPrueba"
              value="No"
              checked={esPrueba === "No"}
              onChange={() => setEsPrueba("No")}
            />
            No
          </label>
        </div>
      </div>

      {/* Pregunta fija 2: ¿Tiene vehículo privado? */}
      <div className="question">
        <label className="question-title">
          ¿Tiene vehículo privado? (Si no, finalizar encuesta)
        </label>
        <div className="radiogroup horizontal">
          <label>
            <input
              type="radio"
              name="vehiculo"
              value="Sí"
              checked={tieneVehiculo === "Sí"}
              onChange={() => setTieneVehiculo("Sí")}
            />
            Sí
          </label>
          <label>
            <input
              type="radio"
              name="vehiculo"
              value="No"
              checked={tieneVehiculo === "No"}
              onChange={() => setTieneVehiculo("No")}
            />
            No
          </label>
        </div>
      </div>

      {/* Si NO tiene vehículo: mensaje + botón enviar */}
      {tieneVehiculo === "No" && (
        <div className="card" style={{ marginTop: 16 }}>
          <p>Gracias por su tiempo, no necesita continuar.</p>
          <button
            className="submit-btn"
            onClick={enviarSinVehiculo}
            disabled={enviando || !esPrueba}
            title={!esPrueba ? "Responda si es una prueba" : ""}
          >
            {enviando ? "Enviando..." : "Enviar"}
          </button>
          {lastCoords && (
            <p className="muted" style={{ marginTop: 8 }}>
              Última ubicación:{" "}
              <strong>
                {lastCoords.lat.toFixed(6)}, {lastCoords.lng.toFixed(6)}
              </strong>{" "}
              · {Math.round(lastCoords.accuracy || 0)} m
            </p>
          )}
        </div>
      )}

      {/* Si SÍ tiene vehículo: renderizamos el Survey */}
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
