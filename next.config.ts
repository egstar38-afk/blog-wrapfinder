import type { NextConfig } from "next";
import guidesRapatries from "./redirections-guides.json";

// Articles PPF et covering rapatriés le 19/11/2026 sous https://www.wrapfinder.fr/guides
// (liste : redirections-guides.json ; textes d'origine gardés dans content/archives).
const SITE = "https://www.wrapfinder.fr";
const THEMES_RAPATRIES: Record<string, string> = {
  "ppf-general": "ppf",
  "ppf-specialise": "ppf-par-zone",
  "covering-general": "covering",
  "covering-specialise": "covering-finitions-et-pieces",
  "ppf-covering-compare": "ppf-ou-covering",
};

// Security headers applied to every response.
// No strict CSP here: AdSense / Amazon affiliate scripts would require extensive
// allow-listing. Add a tuned CSP as a later hardening step if desired.
const securityHeaders = [
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

const nextConfig: NextConfig = {
  // Articles fondus dans une page du site principal : redirection permanente, pour que le blog
  // et le site ne se partagent plus les mêmes recherches (audit de référencement du 18/11/2026).
  // Le texte d'origine est gardé dans content/archives.
  async redirects() {
    return [
      { source: "/covering-moto", destination: "https://www.wrapfinder.fr/covering-moto", permanent: true },
      ...(guidesRapatries as string[]).map((slug) => ({
        source: `/${slug}`,
        destination: `${SITE}/guides/${slug}`,
        permanent: true,
      })),
      ...Object.entries(THEMES_RAPATRIES).map(([categorie, theme]) => ({
        source: `/categorie/${categorie}`,
        destination: `${SITE}/guides/theme/${theme}`,
        permanent: true,
      })),
    ];
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
