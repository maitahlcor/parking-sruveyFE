const BASE_URL = import.meta.env.VITE_API_URL || ""; // "" => usa proxy de Vite en dev

export async function api(path, options = {}) {
  const {
    method = "GET",
    body,
    headers = {},
    // importante para cookies de sesión:
    credentials = "include",
    ...rest
  } = options;

  const isFormData = body instanceof FormData;

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    credentials,              // <--- cookies
    headers: {
      // no pongas Content-Type si usas FormData
      ...(body && !isFormData ? { "Content-Type": "application/json" } : {}),
      ...headers,
    },
    body: body
      ? isFormData
        ? body
        : JSON.stringify(body)
      : undefined,
    ...rest,
  });

  // 204 No Content
  if (res.status === 204) return null;

  const ct = res.headers.get("content-type") || "";
  const data = ct.includes("application/json")
    ? await res.json().catch(() => null)
    : await res.text().catch(() => "");

  if (!res.ok) {
    const msg = (data && data.error) || data || `HTTP ${res.status}`;
    throw new Error(msg);
  }
  return data;
}