"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
  gsap.defaults({ ease: "expo.out", duration: 1 });
  ScrollTrigger.config({ ignoreMobileResize: true });
  // Acceso para QA/depuración (scripts/*.mjs)
  (window as unknown as { __ST?: typeof ScrollTrigger }).__ST = ScrollTrigger;
}

/** Breakpoints compartidos por gsap.matchMedia y CSS */
export const MQ = {
  desktop: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
  /** Efectos ligados al scroll que solo tienen sentido con ancho suficiente */
  wide: "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
  motion: "(prefers-reduced-motion: no-preference)",
  reduced: "(prefers-reduced-motion: reduce)",
};

/**
 * `ScrollTrigger.refresh()` agrupado: varias imágenes que terminan de cargar a la vez
 * provocan un solo recálculo en el siguiente frame libre, no uno por imagen.
 */
let refreshPending = 0;
export function refreshScroll() {
  if (typeof window === "undefined") return;
  window.clearTimeout(refreshPending);
  refreshPending = window.setTimeout(() => ScrollTrigger.refresh(), 180);
}

export { gsap, ScrollTrigger, useGSAP };
