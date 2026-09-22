/** URL pública del sitio (canonical, sitemap, Open Graph). Demo: por defecto, entorno local. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");
