// theround-service base URL, including the /api prefix. Server-only.
export function apiUrl(path: string) {
  const base = process.env.THEROUND_API_URL;

  if (!base) {
    throw new Error("Missing THEROUND_API_URL environment variable.");
  }

  return `${base.replace(/\/+$/, "")}${path}`;
}
