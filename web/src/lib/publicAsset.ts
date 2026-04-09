/** Vite `base` (e.g. GitHub Pages); keeps `/public` URLs working when not served from domain root */
export function publicAsset(path: string): string {
  const base = import.meta.env.BASE_URL;
  const p = path.startsWith("/") ? path.slice(1) : path;
  return `${base}${p}`;
}
