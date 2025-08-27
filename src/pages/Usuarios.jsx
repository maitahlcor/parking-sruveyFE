import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Survey from "../components/Survey";
import preguntasUsuarios from "../data/preguntasUsuarios.json";
import SurveyTables from "../components/SurveyTables";
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
  const [esPrueba, setEsPrueba] = useState(null);            // "Sí" | "No"
  const [tieneVehiculo, setTieneVehiculo] = useState(null);  // "Sí" | "No"
  const [enviando, setEnviando] = useState(false);
  const [lastCoords, setLastCoords] = useState(null);

  // 👇 SOLO vista previa de lo elegido en la tabla de escenarios (no se envía aún)
  const [escenariosPrevi]()
