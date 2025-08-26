import { api, setToken, clearToken, getToken } from "./api";

export async function register(email, password) {
  const { token, user } = await api("/auth/register", {
    method: "POST",
    body: { email, password }
  });
  setToken(token);
  return user; // {id, email, numericId}
}

export async function login(email, password) {
  const { token, user } = await api("/auth/login", {
    method: "POST",
    body: { email, password }
  });
  setToken(token);
  return user;
}

export async function me() {
  if (!getToken()) return null;
  return api("/auth/me");
}

export function logout() {
  clearToken();
}
