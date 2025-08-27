// src/api/encuestas.js
import { api } from "./cliente";
const isProd = import.meta.env.MODE === "production";
const BASE_URL = isProd
  ? import.meta.env.VITE_API_URL          // Vercel
  : "";                                   // proxy de Vite en dev

// Crear encuesta
/*export function crearEncuesta(payload) {
  // payload: { tipo, esPrueba, coords, encuestadorId? }
  return api("/api/encuestas", { method: "POST", body: payload });
}

// Finalizar encuesta con respuestas
export function finalizarEncuesta(id, respuestas = []) {
  return api(`/api/encuestas/${id}/finalizar`, {
    method: "PATCH",
    body: { respuestas },
  });
}

// (opcional) geolocalización
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

// src/api/encuestas.js
import { api } from "./cliente";*/

export function crearEncuesta(payload) {
  return api("/api/encuestas", { method: "POST", body: payload });
}

export function finalizarEncuesta(id, respuestas = []) {
  return api(`/api/encuestas/${id}/finalizar`, {
    method: "PATCH",
    body: { respuestas },
  });
}

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
      pos => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      err => reject(err),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  });
}

