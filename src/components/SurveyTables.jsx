import React, { useMemo, useState } from "react";
// Opción 1: importar el JSON local (Vite permite importar JSON directamente)
import data from "../data/escenarios.json"; // ajusta la ruta

// Mapea cada "Tipo_*" a una imagen (pon aquí tus URLs reales o imports)
const IMG_BY_TIPO = {
  "zer":        "/img/zer.png",
  "lote":       "/img/lote.png",
  "via":        "/img/via.png",
  "cambiar modo transporte Publico": "/img/tpublico.png",
  "cambiar modo taxis/uber":         "/img/taxi.png",
};

// Helper para formatear COP
const fmtCOP = (n) =>
  new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(n);

function OptionCell({ label, tipo, costo, distancia, espera }) {
  const img = IMG_BY_TIPO[tipo];
  return (
    <td style={{ border: "1px solid #ddd", padding: 10, textAlign: "center", verticalAlign: "top" }}>
      <div style={{ fontWeight: 700, marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: 12, color: "#666" }}>{tipo}</div>

      <div style={{
        margin: "10px auto 12px",
        width: 140, height: 80,
        borderRadius: 10, border: "1px solid #e5e7eb",
        display: "flex", alignItems: "center", justifyContent: "center",
        overflow: "hidden", background: "#fafafa"
      }}>
        {img
          ? <img src={img} alt={`Imagen ${tipo}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          : <span style={{ fontSize: 12, color: "#555" }}>Imagen {tipo}</span>}
      </div>

      <div style={{ fontSize: 14, lineHeight: "22px" }}>
        <div><strong>Costo:</strong> {fmtCOP(costo)}</div>
        <div><strong>Distancia:</strong> {distancia} m</div>
        <div><strong>Espera:</strong> {espera} s</div>
      </div>
    </td>
  );
}

function QuestionTable({ escenario, onChange, value }) {
  const name = `esc-${escenario.EscenarioID}`;
  return (
    <div style={{ marginBottom: 24, border: "1px solid #e5e7eb", borderRadius: 12, overflow: "hidden" }}>
      <div style={{ padding: 12, background: "#f9fafb", borderBottom: "1px solid #e5e7eb", fontWeight: 700 }}>
        Escenario #{escenario.EscenarioID}
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ width: "33.33%", border: "1px solid #ddd", padding: 10 }}>Opción A</th>
            <th style={{ width: "33.33%", border: "1px solid #ddd", padding: 10 }}>Opción B</th>
            <th style={{ width: "33.33%", border: "1px solid #ddd", padding: 10 }}>Opción C</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <OptionCell
              label="A"
              tipo={escenario.Tipo_A}
              costo={escenario.Costo_A}
              distancia={escenario.Distancia_A}
              espera={escenario.Espera_A}
            />
            <OptionCell
              label="B"
              tipo={escenario.Tipo_B}
              costo={escenario.Costo_B}
              distancia={escenario.Distancia_B}
              espera={escenario.Espera_B}
            />
            <OptionCell
              label="C"
              tipo={escenario.Tipo_C}
              costo={escenario.Costo_C}
              distancia={escenario.Distancia_C}
              espera={escenario.Espera_C}
            />
          </tr>
          <tr>
            {["A","B","C"].map((opt) => (
              <td key={opt} style={{ border: "1px solid #ddd", padding: 10, textAlign: "center" }}>
                <label style={{ cursor: "pointer", fontWeight: 600 }}>
                  <input
                    type="radio"
                    name={name}
                    value={opt}
                    checked={value === opt}
                    onChange={() => onChange(escenario.EscenarioID, opt)}
                    style={{ marginRight: 8 }}
                  />
                  Elegir {opt}
                </label>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default function SurveyTables() {
  // 1) tomar todas las versiones presentes en el JSON
  const versionesDisponibles = useMemo(() => {
    const set = new Set(data.escenarios.map(e => e.version));
    return [...set].sort((a,b)=>a-b);
  }, []);

  // 2) elegir una versión al azar en el primer render
  const [versionElegida] = useState(() => {
    const r = Math.floor(Math.random() * versionesDisponibles.length);
    return versionesDisponibles[r];
  });

  // 3) armar la lista de escenarios de esa versión (puedes barajar si quieres)
  const escenarios = useMemo(() => {
    const arr = data.escenarios.filter(e => e.version === versionElegida);
    // barajar para variar el orden de las preguntas
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, [versionElegida]);

  // 4) estado de respuestas { [EscenarioID]: "A"|"B"|"C" }
  const [answers, setAnswers] = useState({});

  const handleChange = (escenarioID, opt) => {
    setAnswers(prev => ({ ...prev, [escenarioID]: opt }));
  };

  const handleSubmit = () => {
    // payload listo para enviar a tu backend
    const payload = {
      version: versionElegida,
      respuestas: escenarios.map(e => ({
        EscenarioID: e.EscenarioID,
        opcion: answers[e.EscenarioID] || null
      }))
    };
    console.log("ENVIAR", payload);
    alert("Respuestas listas en consola.\n" + JSON.stringify(payload, null, 2));
    // fetch(`${import.meta.env.VITE_API_URL}/api/respuestas`, { ... })
  };

  return (
    <div style={{ maxWidth: 980, margin: "0 auto", padding: 16 }}>
      <h2 style={{ margin: "8px 0 16px" }}>
        Encuesta – versión <strong>{versionElegida}</strong>
      </h2>

      {escenarios.map((esc) => (
        <QuestionTable
          key={esc.EscenarioID}
          escenario={esc}
          value={answers[esc.EscenarioID] || ""}
          onChange={handleChange}
        />
      ))}

      <div style={{ textAlign: "right", marginTop: 12 }}>
        <button
          onClick={handleSubmit}
          style={{
            background: "#2563eb", color: "white", border: 0,
            padding: "10px 16px", borderRadius: 8, cursor: "pointer", fontWeight: 700
          }}
        >
          Enviar respuestas
        </button>
      </div>
    </div>
  );
}
