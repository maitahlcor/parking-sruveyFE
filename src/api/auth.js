import { api } from "./cliente";

// Inicia sesión (email/password) y retorna el usuario
export function login(email, password) {
  return api("/auth/login", {
    method: "POST",
    body: { email, password },
  });
}
//registra el 
export function register(email, password) {
  return api("/auth/register", {
    method: "POST",
    body: { email, password },
  });
}
// Cierra sesión en el backend (borra cookie de sesión si la hay)
export function logout() {
  return api("/auth/logout", { method: "POST" });
}

// Devuelve el usuario actual (o 401 si no hay sesión)
export function me() {
  return api("/auth/me");
}
