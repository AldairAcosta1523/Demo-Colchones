"use client";

import { useRef } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";
import { DUR, EASE } from "@/lib/motion";

/**
 * Línea divisoria que se dibuja al entrar en pantalla.
 *
 * Es el separador editorial del sistema: sustituye a los `border-top` estáticos
 * en las secciones donde la lista se revela en secuencia.
 */
export default function Rule({
  className = "",
  delay = 0,
  light = false,
}: {
  className?: string;
  delay?: number;
  light?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.fromTo(
          el,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: DUR.rule,
            ease: EASE.reveal,
            delay,
            scrollTrigger: { trigger: el, start: "top 92%", once: true },
          }
        );
      });
      mm.add(MQ.reduced, () => gsap.set(el, { scaleX: 1 }));
    },
    { scope: ref }
  );

  return <span ref={ref} className={`rule ${light ? "rule--light" : ""} ${className}`} aria-hidden="true" />;
}
