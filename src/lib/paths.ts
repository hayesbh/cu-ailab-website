export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export const withBasePath = (p: string) => {
  if (p.startsWith("http") || p.startsWith("mailto:") || p.startsWith("#")) return p;
  return `${basePath}${p.startsWith("/") ? p : `/${p}`}`;
};
