import { useState } from "react";
import Survey from "../components/Survey";
import preguntasUsuarios from "../data/preguntasUsuarios.json";

export default function Usuarios() {
  const [isTest, setIsTest] = useState(null); 
  const [hasVehicle, setHasVehicle] = useState(null); 

  const handleSurveySubmit = (answers) => {
    const dataToSave = {
      isTest,
      hasVehicle,
      answers: hasVehicle === "Sí" ? answers : {}, 
    };

    console.log("Guardando en DB:", dataToSave);
    alert("Encuesta enviada correctamente ✅");
  };

  return (
    <div>
      <h1>Encuesta de Usuarios</h1>

      {/* Pregunta 1 */}
      <div className="question">
        <label>¿Es una prueba? *</label>
        <div>
          <label>
            <input
              type="radio"
              name="isTest"
              value="Sí"
              onChange={(e) => setIsTest(e.target.value)}
              required
            />
            Sí
          </label>
          <label>
            <input
              type="radio"
              name="isTest"
              value="No"
              onChange={(e) => setIsTest(e.target.value)}
              required
            />
            No
          </label>
        </div>
      </div>

      {/* Pregunta 2 */}
      <div className="question">
        <label>¿Tiene vehículo privado? (Si no, finalizar encuesta) *</label>
        <div>
          <label>
            <input
              type="radio"
              name="hasVehicle"
              value="Sí"
              onChange={(e) => setHasVehicle(e.target.value)}
              required
            />
            Sí
          </label>
          <label>
            <input
              type="radio"
              name="hasVehicle"
              value="No"
              onChange={(e) => setHasVehicle(e.target.value)}
              required
            />
            No
          </label>
        </div>
      </div>

      {/* Caso: tiene vehículo → renderizamos el formulario completo */}
      {hasVehicle === "Sí" && (
        <Survey questions={preguntasUsuarios} onSubmit={handleSurveySubmit} />
      )}

      {/* Caso: no tiene vehículo → mensaje + botón de enviar */}
      {hasVehicle === "No" && (
        <div>
          <p>Gracias por su tiempo, no necesita continuar.</p>
          <button
            onClick={() => handleSurveySubmit({})}
            className="submit-btn"
          >
            Enviar
          </button>
        </div>
      )}
    </div>
  );
}
