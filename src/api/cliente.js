const BASE_URL = import.meta.env.VITE_API_URL || ""; // proxy en dev
export async function api(path, options = {}) {
  const {
    method = "GET",
    body,
    headers = {},
    credentials = "include",                 // <- NECESARIO para cookies
    ...rest
  } = options;

  const isFormData = body instanceof FormData;

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    credentials,
    headers: {
      ...(body && !isFormData ? { "Content-Type": "application/json" } : {}),
      ...headers,
    },
    body: body ? (isFormData ? body : JSON.stringify(body)) : undefined,
    ...rest,
  });

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

