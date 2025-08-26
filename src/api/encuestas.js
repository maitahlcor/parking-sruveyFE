import { api } from "./cliente";

// crear encuesta
export function crearEncuesta(payload) {
  return api("/api/encuestas", { method: "POST", body: payload });
}

// finalizar encuesta
export function finalizarEncuesta(id) {
  return api(`/api/encuestas/${id}/finalizar`, { method: "PATCH" });
}

// guardar respuestas
export function guardarRespuestas(encuestaId, respuestas) {
  return api("/api/respuestas", {
    method: "POST",
    body: { encuestaId, respuestas }
  });
}

// (opcional) geolocalización
export function getCoords() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) return reject(new Error("Geolocalización no disponible"));
    navigator.geolocation.getCurrentPosition(
      pos => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      err => reject(err),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  });
}
