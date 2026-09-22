"use client";

import { useRef, type ReactNode, type ElementType, type CSSProperties } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";
import { DUR, EASE, MOVE, START, STAGGER } from "@/lib/motion";

type Props = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Anima los hijos directos con stagger en vez del contenedor. */
  stagger?: number | true;
  delay?: number;
  y?: number;
  start?: string;
  /** "manual" espera al evento almara:ready (hero). */
  trigger?: "scroll" | "manual";
  style?: CSSProperties;
  id?: string;
  "aria-label"?: string;
};

/**
 * Revelado base: opacidad + translateY con frenado largo.
 *
 * El estado inicial solo se aplica dentro del contexto de motion, así que sin JS
 * (o con reduced motion) el contenido queda visible y legible.
 */
export default function Reveal({
  children,
  as: Tag = "div",
  className = "",
  stagger,
  delay = 0,
  y = MOVE.y,
  start = START,
  trigger = "scroll",
  style,
  id,
  ...rest
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const targets = stagger !== undefined ? Array.from(el.children) : [el];
      const step = stagger === true ? STAGGER : (stagger ?? 0);
      const mm = gsap.matchMedia();

      mm.add(MQ.motion, () => {
        gsap.set(targets, { y, opacity: 0 });
        const vars = {
          y: 0,
          opacity: 1,
          duration: DUR.content,
          ease: EASE.reveal,
          stagger: step,
          delay,
          overwrite: "auto" as const,
        };
        if (trigger === "manual") {
          const play = () => gsap.to(targets, vars);
          if (document.documentElement.classList.contains("is-ready")) play();
          else window.addEventListener("almara:ready", play, { once: true });
          return () => window.removeEventListener("almara:ready", play);
        }
        gsap.to(targets, { ...vars, scrollTrigger: { trigger: el, start, once: true } });
      });

      mm.add(MQ.reduced, () => {
        gsap.set(targets, { y: 0, opacity: 1 });
      });
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref} className={className} style={style} id={id} {...rest}>
      {children}
    </Tag>
  );
}
