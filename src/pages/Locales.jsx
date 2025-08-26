import { useState } from "react";
import Survey from "../components/Survey";
import preguntasLocales from "../data/encuestaLocales.json";
import { crearEncuesta, guardarRespuestas, finalizarEncuesta } from "../api/encuestas";

export default function Locales() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const encuestadorId = 1;

  const handleSurveySubmit = async (answers) => {
    try {
      setLoading(true);
      const encuesta = await crearEncuesta({
        esPrueba: false,
        tipo: "LOCAL",
        encuestadorId,
        usuarioEmail: email || null,
      });
      await guardarRespuestas(encuesta._id, answers);
      await finalizarEncuesta(encuesta._id);
      alert("¡Encuesta de locales enviada!");
    } catch (e) {
      console.error(e);
      alert("Error al enviar la encuesta de locales");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Encuesta de Locales</h1>

      <div className="question">
        <label>Correo del local (opcional)</label>
        <input
          type="email"
          placeholder="ej: local@dominio.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <Survey
        questions={preguntasLocales}
        onSubmit={handleSurveySubmit}
        disabled={loading}
      />
    </div>
  );
}
