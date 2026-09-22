"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { EASE } from "@/lib/motion";

/**
 * Apertura de la experiencia (≈0,6 s hasta que el contenido queda a la vista).
 *
 * Fondo marfil → se revela el nombre Almara bajo máscara → una línea fina lo subraya →
 * la cortina sube y emite `almara:ready`, que dispara la secuencia del hero y del header.
 *
 * Se reproduce **una sola vez por sesión**: al navegar a una página de modelo o volver al
 * inicio no vuelve a aparecer, porque repetir la cortina en cada clic se percibe como lentitud.
 * Con `prefers-reduced-motion` no existe: se emite el evento de inmediato.
 */
const CLAVE_SESION = "almara:intro";

/** `sessionStorage` puede lanzar en modo privado o con cookies bloqueadas. */
function yaVista(): boolean {
  try {
    return sessionStorage.getItem(CLAVE_SESION) === "1";
  } catch {
    return false;
  }
}
function marcarVista() {
  try {
    sessionStorage.setItem(CLAVE_SESION, "1");
  } catch {
    /* sin almacenamiento: se volverá a ver, no es grave */
  }
}
export default function Preloader() {
  const ref = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useGSAP(
    () => {
      const el = ref.current;
      const html = document.documentElement;
      const ready = () => {
        html.classList.add("is-ready");
        window.dispatchEvent(new Event("almara:ready"));
        window.__lenis?.start();
      };

      // Si el navegador ha tardado en llegar hasta aquí (equipo modesto, red lenta), la cortina
      // solo añadiría espera sobre una espera: se salta y el contenido aparece de inmediato.
      const tarde = performance.now() > 1200;

      if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches || yaVista() || tarde) {
        ready();
        setDone(true);
        marcarVista();
        return;
      }
      marcarVista();

      window.__lenis?.stop();
      window.scrollTo(0, 0);

      const tl = gsap.timeline();
      tl.fromTo(".preloader__mark", { yPercent: 115 }, { yPercent: 0, duration: 0.62, ease: EASE.reveal }, 0)
        .fromTo(".preloader__rule", { scaleX: 0 }, { scaleX: 1, duration: 0.5, ease: "power2.inOut" }, 0.08)
        .fromTo(".preloader__sub", { opacity: 0 }, { opacity: 1, duration: 0.3, ease: EASE.ui }, 0.24)
        .to(".preloader__inner", { yPercent: -16, opacity: 0, duration: 0.34, ease: "power2.in" }, 0.5)
        // La cortina se retira desde arriba: el hero ya está debajo, listo para su secuencia.
        .to(
          el,
          {
            clipPath: "inset(0% 0% 100% 0%)",
            duration: 0.62,
            ease: "power4.inOut",
            onStart: ready,
            onComplete: () => setDone(true),
          },
          0.58
        );
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={`preloader${done ? " is-done" : ""}`} aria-hidden="true">
      <div className="preloader__inner">
        <div className="preloader__clip">
          <span className="preloader__mark">Almara</span>
        </div>
        <span className="preloader__rule" />
        <span className="preloader__sub label">The Art of Rest</span>
      </div>
    </div>
  );
}
