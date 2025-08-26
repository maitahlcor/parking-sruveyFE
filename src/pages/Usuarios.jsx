import { useState } from "react";
import Survey from "../components/Survey";
import preguntasUsuarios from "../data/preguntasUsuarios.json";
import { crearEncuesta, guardarRespuestas, finalizarEncuesta } from "../api/encuestas";

export default function Usuarios() {
  const [esPrueba, setEsPrueba] = useState(null);
  const [tieneVehiculo, setTieneVehiculo] = useState(null);
  const encuestadorId = 1; // TODO: ajustar al ID real (login/selector)

  // Enviar cuando NO tiene vehículo
  const handleEnviarSinVehiculo = async () => {
    try {
      const encuesta = await crearEncuesta({
        esPrueba,
        tipo: "USUARIO",
        encuestadorId,
        usuarioEmail: null, // opcional
      });

      // Guarda también las dos preguntas fijas como metadatos en respuestas (si quieres)
      const meta = {
        qEsPrueba: esPrueba,
        qTieneVehiculo: "No",
      };
      await guardarRespuestas(encuesta._id, meta);

      await finalizarEncuesta(encuesta._id);
      alert("¡Encuesta enviada sin vehículo!");
    } catch (e) {
      console.error(e);
      alert("Error al enviar la encuesta");
    }
  };

  // Enviar cuando SÍ tiene vehículo (recibe las respuestas del Survey)
  const handleSubmitConVehiculo = async (answers) => {
    try {
      const encuesta = await crearEncuesta({
        esPrueba,
        tipo: "USUARIO",
        encuestadorId,
        usuarioEmail: null,
      });

      // Merge con las dos preguntas fijas
      const all = {
        qEsPrueba: esPrueba,
        qTieneVehiculo: "Sí",
        ...answers,
      };
      await guardarRespuestas(encuesta._id, all);
      await finalizarEncuesta(encuesta._id);
      alert("¡Encuesta enviada!");
    } catch (e) {
      console.error(e);
      alert("Error al enviar la encuesta");
    }
  };

  return (
    <div>
      <h1>Encuesta de Usuarios</h1>

      {/* Pregunta fija 1 */}
      <div className="question">
        <label>¿Es una prueba?</label>
        <div>
          <label>
            <input
              type="radio"
              name="esPrueba"
              value="Sí"
              onChange={() => setEsPrueba("Sí")}
            />
            Sí
          </label>
          <label>
            <input
              type="radio"
              name="esPrueba"
              value="No"
              onChange={() => setEsPrueba("No")}
            />
            No
          </label>
        </div>
      </div>

      {/* Pregunta fija 2 */}
      <div className="question">
        <label>¿Tiene vehículo privado? (Si no, finalizar encuesta)</label>
        <div>
          <label>
            <input
              type="radio"
              name="vehiculo"
              value="Sí"
              onChange={() => setTieneVehiculo("Sí")}
            />
            Sí
          </label>
          <label>
            <input
              type="radio"
              name="vehiculo"
              value="No"
              onChange={() => setTieneVehiculo("No")}
            />
            No
          </label>
        </div>
      </div>

      {/* Caso: NO tiene vehículo → mensaje + botón que guarda en backend */}
      {tieneVehiculo === "No" && (
        <div>
          <p>Gracias por su tiempo, no necesita continuar.</p>
          <button type="button" className="submit-btn" onClick={handleEnviarSinVehiculo}>
            Enviar
          </button>
        </div>
      )}

      {/* Caso: SÍ tiene vehículo → mostramos Survey y al enviar guardamos en backend */}
      {tieneVehiculo === "Sí" && (
        <Survey
          questions={preguntasUsuarios}
          onSubmit={handleSubmitConVehiculo}
        />
      )}
    </div>
  );
}
