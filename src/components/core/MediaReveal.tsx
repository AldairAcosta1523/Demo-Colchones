"use client";

import { useRef, type ReactNode } from "react";
import Image from "next/image";
import { gsap, useGSAP, MQ, ScrollTrigger, refreshScroll } from "@/lib/gsap";
import { CLIP, DUR, EASE, MOVE } from "@/lib/motion";

type Props = {
  src: string;
  alt: string;
  sizes: string;
  /** Relación de aspecto del marco (`4 / 5`, `16 / 10`…). Si se omite, la define el CSS. */
  ratio?: string;
  className?: string;
  priority?: boolean;
  quality?: number;
  /** Recorrido del parallax interno en % (0 lo desactiva). */
  parallax?: number;
  /** "scroll": revela al entrar · "manual": espera a `almara:ready` · "none": sin entrada. */
  trigger?: "scroll" | "manual" | "none";
  delay?: number;
  /** Contenido superpuesto (etiquetas, títulos). */
  children?: ReactNode;
  /** Posición del recorte dentro del marco. */
  position?: string;
};

/**
 * Fotografía con revelado de máscara + zoom-out de asentado + parallax interno.
 *
 * Tres capas separadas para que cada animación tenga su propio target y no compitan:
 *   .media        → clip-path (apertura)
 *   .media__inner → yPercent (parallax de scroll)
 *   .media__img   → scale (asentado de entrada)
 */
export default function MediaReveal({
  src,
  alt,
  sizes,
  ratio,
  className = "",
  priority,
  quality = 78,
  parallax = MOVE.parallax,
  trigger = "scroll",
  delay = 0,
  children,
  position,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const inner = el.querySelector<HTMLElement>(".media__inner");
      const img = el.querySelector<HTMLElement>("img");
      const mm = gsap.matchMedia();

      mm.add(MQ.motion, () => {
        if (trigger !== "none") {
          gsap.set(el, { clipPath: CLIP.closed, willChange: "clip-path" });
          // A partir de aquí manda GSAP: se desactiva el estado inicial del CSS (ver base.css).
          el.dataset.gsap = "";
          gsap.set(img, { scale: MOVE.zoom });

          const play = () => {
            const tl = gsap.timeline({ delay });
            tl.to(el, {
              clipPath: CLIP.open,
              duration: DUR.mask,
              ease: EASE.mask,
              // Se retira la máscara al acabar: dejarla puesta mantiene la imagen como capa
              // enmascarada el resto de la visita, y son nueve fotografías.
              onComplete: () => gsap.set(el, { clearProps: "clipPath,willChange" }),
            }).to(img, { scale: 1, duration: DUR.settle, ease: EASE.settle }, 0);
            return tl;
          };

          if (trigger === "manual") {
            if (document.documentElement.classList.contains("is-ready")) play();
            else window.addEventListener("almara:ready", play, { once: true });
          } else {
            ScrollTrigger.create({ trigger: el, start: "top 88%", once: true, onEnter: play });
          }
        }

        // Parallax interno: la fotografía se mueve unos píxeles dentro de su marco.
        // Solo en pantallas anchas: en móvil son nueve animaciones ligadas al scroll sobre
        // hardware más justo, y el efecto casi no se aprecia.
        if (parallax > 0 && inner && window.matchMedia("(min-width: 768px)").matches) {
          gsap.fromTo(
            inner,
            { yPercent: -parallax },
            {
              yPercent: parallax,
              ease: EASE.scrub,
              scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
            }
          );
        }
      });

      mm.add(MQ.reduced, () => {
        gsap.set(el, { clipPath: "none" });
        gsap.set(img, { scale: 1 });
      });
    },
    { scope: ref }
  );

  return (
    <div
      ref={ref}
      className={`media ${className}`}
      style={ratio ? ({ ["--ratio" as string]: ratio } as React.CSSProperties) : undefined}
      data-parallax={parallax > 0 ? "" : undefined}
    >
      <div className="media__inner">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          quality={quality}
          style={position ? { objectPosition: position } : undefined}
          // Una foto que cambia el layout al cargar desplaza los ScrollTrigger de más abajo.
          onLoad={refreshScroll}
        />
      </div>
      {children}
    </div>
  );
}
