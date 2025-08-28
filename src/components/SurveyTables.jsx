// src/components/SurveyTables.jsx
import React, { useMemo, useState, useEffect } from "react";
import data from "../data/escenarios.json";

// ⬇️ Mapeo de imagen por TIPO (fallback si el escenario no trae Img_A/B/C)
const IMG_BY_TIPO = {
  "zer": "/data/imgZer.png",
  "via": "/data/imgVia.png",
  "cambiar modo transporte Publico": "/data/imgTpublic.png",
  "cambiar modo taxis/uber": "/data/imgTaxUber.png",
  // si agregas imagen para lote:
  "lote": "/data/imgLote.png",
};

const fmtCOP = (n) =>
  new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(n ?? 0);

// ⬇️ Celda de opción con imagen (usa Img_* del JSON; si no hay, cae al mapeo por tipo)
function OptionCell({ label, tipo, costo, distancia, espera, imgSrc }) {
  const src = imgSrc || IMG_BY_TIPO[tipo];

  return (
    <td style={{ border: "1px solid #ddd", padding: 10, textAlign: "center", verticalAlign: "top" }}>
      <div style={{ fontWeight: 700, marginBottom: 6 }}>Opción {label}</div>
      <div style={{ fontSize: 12, color: "#666" }}>{tipo || "-"}</div>

      <div
        style={{
          margin: "10px auto 12px",
          width: 140,
          height: 80,
          borderRadius: 10,
          border: "1px solid #e5e7eb",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          background: "#fafafa",
        }}
      >
        {src ? (
          <img
            src={src}
            alt={`Imagen ${tipo}`}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            onError={(e) => {
              // si la ruta existe pero falla, oculto la imagen y muestro texto
              e.currentTarget.style.display = "none";
              const s = e.currentTarget.nextSibling;
              if (s) s.style.display = "block";
            }}
          />
        ) : null}
        {/* texto de respaldo si no hay imagen o falló */}
        <span style={{ display: src ? "none" : "block", fontSize: 12, color: "#555", padding: 8 }}>
          Imagen {tipo || "—"}
        </span>
      </div>

      <div style={{ fontSize: 14, lineHeight: "22px" }}>
        <div>
          <strong>Costo:</strong> {fmtCOP(costo)}
        </div>
        <div>
          <strong>Distancia:</strong> {distancia ?? 0} m
        </div>
        <div>
          <strong>Espera:</strong> {espera ?? 0} s
        </div>
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
            <th style={{ border: "1px solid #ddd", padding: 10 }}>A</th>
            <th style={{ border: "1px solid #ddd", padding: 10 }}>B</th>
            <th style={{ border: "1px solid #ddd", padding: 10 }}>C</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <OptionCell
              label="A"
              imgSrc={escenario.Img_A}
              tipo={escenario.Tipo_A}
              costo={escenario.Costo_A}
              distancia={escenario.Distancia_A}
              espera={escenario.Espera_A}
            />
            <OptionCell
              label="B"
              imgSrc={escenario.Img_B}
              tipo={escenario.Tipo_B}
              costo={escenario.Costo_B}
              distancia={escenario.Distancia_B}
              espera={escenario.Espera_B}
            />
            <OptionCell
              label="C"
              imgSrc={escenario.Img_C}
              tipo={escenario.Tipo_C}
              costo={escenario.Costo_C}
              distancia={escenario.Distancia_C}
              espera={escenario.Espera_C}
            />
          </tr>
          <tr>
            {["A", "B", "C"].map((opt) => (
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

export default function SurveyTables({ onChange, showSubmit = false }) {
  // versiones disponibles en el JSON
  const versionesDisponibles = useMemo(() => {
    const set = new Set(data.escenarios.map((e) => e.version));
    return [...set];
  }, []);

  // elige 1 versión al azar (si quieres forzar una para test, pon const [versionElegida] = useState(4);)
  const [versionElegida] = useState(() => {
    const r = Math.floor(Math.random() * versionesDisponibles.length);
    return versionesDisponibles[r];
  });

  // escenarios de esa versión (barajados)
  const escenarios = useMemo(() => {
    const arr = data.escenarios.filter((e) => e.version === versionElegida);
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, [versionElegida]);

  const [answers, setAnswers] = useState({});
  const completo = escenarios.every((e) => answers[e.EscenarioID]);

    const emit = () => {
    // Solo escenarios elegidos
    const seleccionadas = escenarios
      .filter((e) => answers[e.EscenarioID])
      .map((e) => ({
        EscenarioID: e.EscenarioID,
        opcion: answers[e.EscenarioID],
      }));

    const total = escenarios.length;
    const completas = seleccionadas.length;
    const payload = {
      version: versionElegida,
      total,
      completas,
      faltantes: total - completas,
      completo: completas === total,
      respuestas: seleccionadas, // 👈 solo las seleccionadas
    };

    onChange?.(payload);
  };


  useEffect(() => {
    emit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answers]);

  const handleChange = (id, opt) => setAnswers((p) => ({ ...p, [id]: opt }));

  return (
    <div style={{ maxWidth: 980, margin: "0 auto", padding: 16 }}>
      <h2 style={{ margin: "8px 0 16px" }}>
        Escenarios – versión <strong>{versionElegida}</strong>
      </h2>

      {escenarios.map((esc) => (
        <QuestionTable key={esc.EscenarioID} escenario={esc} value={answers[esc.EscenarioID] || ""} onChange={handleChange} />
      ))}

      {showSubmit && (
        <div style={{ textAlign: "right", marginTop: 12 }}>
          <button className="submit-btn" disabled={!completo} onClick={emit}>
            Registrar respuestas
          </button>
        </div>
      )}
    </div>
  );
}
