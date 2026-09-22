import { ImageResponse } from "next/og";
import { hero, site } from "@/data/content";

export const runtime = "nodejs";
// Se genera en tiempo de compilación: lo exige la exportación estática (GitHub Pages)
// y además evita rehacer la imagen en cada petición.
export const dynamic = "force-static";
export const alt = "Almara · El descanso que tu cuerpo merece";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 76,
          background: "#F5F2EC",
          color: "#1E2823",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 56,
              height: 56,
              borderRadius: 16,
              background: "#B66F57",
              color: "#FFFCF8",
              fontSize: 34,
            }}
          >
            A
          </div>
          <div style={{ fontSize: 34, letterSpacing: 1 }}>Almara</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 24, letterSpacing: 4, textTransform: "uppercase", color: "#6F665C", fontFamily: "Arial, sans-serif" }}>
            {hero.eyebrow}
          </div>
          <div style={{ fontSize: 86, lineHeight: 1.04, maxWidth: 940 }}>El descanso que tu cuerpo</div>
          <div style={{ fontSize: 86, lineHeight: 1.04, color: "#B66F57", fontStyle: "italic" }}>merece.</div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 24,
            color: "#554C44",
            fontFamily: "Arial, sans-serif",
          }}
        >
          <span>Esencial · Natura · Signature</span>
          <span>{site.tagline}</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
