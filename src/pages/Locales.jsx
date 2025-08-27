// src/pages/Locales.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Survey from "../components/Survey";
import preguntasLocales from "../data/encuestaLocales.json";
import { crearEncuesta, finalizarEncuesta, getCoords } from "../api/encuestas";

// Reutiliza el mismo helper
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

export default function Locales() {
  const [enviando, setEnviando] = useState(false);
  const [lastCoords, setLastCoords] = useState(null);
  const navigate = useNavigate();

  const enviarLocales = async (answers) => {
    setEnviando(true);
    try {
      const coords = await getCoords().catch(() => null);
      if (coords) setLastCoords(coords);

      const { encuestaId } = await crearEncuesta({
        tipo: "local",       // 👈 diferencia
        esPrueba: false,     // o añade una pregunta fija si quieres
        coords,
      });

      const respuestas = aArregloDeRespuestas(answers, preguntasLocales);

      await finalizarEncuesta(encuestaId, respuestas);
      alert("¡Encuesta de locales enviada!");
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
      <h1>Encuesta de Locales</h1>
      <Survey
        questions={preguntasLocales}
        onSubmit={enviarLocales}
        disabled={enviando}
        lastCoords={lastCoords}
      />
    </div>
  );
}
