"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";
import { EASE } from "@/lib/motion";
import { models } from "@/data/content";

/**
 * Riel de la colección: acompaña el recorrido de un producto al siguiente.
 * La línea se llena con el scroll y el índice activo cambia al cruzar cada modelo.
 * Solo existe en escritorio ancho, donde el margen lateral tiene sitio para él.
 */
export default function CollectionRail() {
  const ref = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);

  useGSAP(
    () => {
      const el = ref.current;
      const list = document.querySelector<HTMLElement>(".collection__list");
      if (!el || !list) return;
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1200px)", () => {
        gsap.fromTo(
          ".rail__fill",
          { scaleY: 0 },
          { scaleY: 1, ease: EASE.scrub, scrollTrigger: { trigger: list, start: "top 55%", end: "bottom 55%", scrub: 0.3 } }
        );
        // Se consulta desde el propio listado: dentro de `useGSAP` con scope, el texto de
        // selector se resuelve contra el riel, que no contiene a los productos.
        list.querySelectorAll<HTMLElement>(".product").forEach((product, i) => {
          ScrollTrigger.create({
            trigger: product,
            start: "top 55%",
            end: "bottom 55%",
            onToggle: (self) => self.isActive && setCurrent(i),
          });
        });
        // El riel solo se ve mientras la lista cruza la pantalla.
        ScrollTrigger.create({
          trigger: list,
          start: "top 60%",
          end: "bottom 45%",
          toggleClass: { targets: el, className: "is-visible" },
        });
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className="rail" aria-hidden="true">
      <div className="rail__inner">
        <span className="rail__count">
          <span className="rail__current" key={current}>
            {models[current].index}
          </span>
          <span className="rail__total">/ 0{models.length}</span>
        </span>
        <span className="rail__track">
          <span className="rail__fill" />
        </span>
        <span className="rail__name" key={`n-${current}`}>
          {models[current].name}
        </span>
      </div>
    </div>
  );
}
