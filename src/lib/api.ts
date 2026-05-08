// Backend URL — reads from env var first, falls back to the Render production URL.
// VITE_API_BASE_URL can be set in .env (local) or Vercel dashboard (production).
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.toString().replace(/\/$/, "") ||
  "https://brim-backend-1.onrender.com";

export type ApiErrorShape = {
  success?: boolean;
  message?: string;
  error?: string;
  msg?: string;
};

function getAuthToken() {
  return localStorage.getItem("token") || "";
}

export async function apiRequest<TResponse = any>(
  path: string,
  options: RequestInit & { json?: unknown; auth?: boolean } = {},
): Promise<{ ok: true; data: TResponse } | { ok: false; status: number; data: ApiErrorShape | any }> {
  const { json, auth = true, headers, ...rest } = options;

  const finalHeaders: Record<string, string> = {
    ...(headers as Record<string, string> | undefined),
  };

  if (json !== undefined) {
    finalHeaders["Content-Type"] = "application/json";
  }

  if (auth) {
    const token = getAuthToken();
    if (token) finalHeaders.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`, {
    ...rest,
    headers: finalHeaders,
    body: json !== undefined ? JSON.stringify(json) : rest.body,
  });

  const text = await res.text();
  let data: any = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = { message: text };
  }

  if (res.ok) return { ok: true, data };
  return { ok: false, status: res.status, data };
}

