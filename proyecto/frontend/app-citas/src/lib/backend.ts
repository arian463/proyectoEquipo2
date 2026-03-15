const FALLBACK_BACKEND_URL = "http://localhost:3010";

function normalize(url: string): string {
  return url.replace(/\/+$/, "");
}

export function getBackendUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_BACKEND_URL ?? process.env.BACKEND_URL;
  if (!envUrl) {
    return FALLBACK_BACKEND_URL;
  }
  return normalize(envUrl);
}
