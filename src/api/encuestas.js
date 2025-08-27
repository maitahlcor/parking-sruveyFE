import { api } from "./cliente";

// POST /api/encuestas
export function crearEncuesta(payload) {
  return api("/api/encuestas", { method: "POST", body: payload });
}

// PATCH /api/encuestas/:id/finalizar  (con respuestas)
export function finalizarEncuesta(id, respuestas = []) {
  return api(`/api/encuestas/${id}/finalizar`, {
    method: "PATCH",
    body: { respuestas },
  });
}

// (opcional) si mantienes una ruta separada de respuestas
export function guardarRespuestas(encuestaId, respuestas) {
  return api("/api/respuestas", {
    method: "POST",
    body: { encuestaId, respuestas },
  });
}

export function getCoords() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) return reject(new Error("Geolocalización no disponible"));
    navigator.geolocation.getCurrentPosition(
      pos => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude, accuracy: pos.coords.accuracy }),
      err => reject(err),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  });
}
