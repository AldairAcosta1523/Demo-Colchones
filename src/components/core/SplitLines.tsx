"use client";

import { useRef, type ReactNode, type ElementType } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";
import { DUR, EASE, STAGGER } from "@/lib/motion";

type Props = {
  lines: ReactNode[];
  as?: ElementType;
  className?: string;
  lineClassName?: string;
  /** "scroll": anima al entrar en viewport · "manual": espera al evento `almara:ready` (hero) · "scrub": ligado al scroll */
  trigger?: "scroll" | "manual" | "scrub";
  delay?: number;
  stagger?: number;
  start?: string;
  id?: string;
};

/**
 * Headline editorial dividido en líneas. Cada línea vive en un contenedor con overflow hidden
 * y entra con translateY (mask reveal). Sin rotación: el titular sube recto, como una página.
 */
export default function SplitLines({
  lines,
  as: Tag = "h2",
  className = "",
  lineClassName = "",
  trigger = "scroll",
  delay = 0,
  stagger = STAGGER,
  start = "top 82%",
  id,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const inners = el.querySelectorAll<HTMLElement>(".split-line__inner");
      const mm = gsap.matchMedia();

      mm.add(MQ.motion, () => {
        gsap.set(inners, { y: 0, yPercent: 108 });
        const anim = () =>
          gsap.to(inners, {
            yPercent: 0,
            duration: DUR.content + 0.15,
            ease: EASE.reveal,
            stagger,
            delay,
            overwrite: "auto",
          });

        if (trigger === "manual") {
          let played = false;
          const play = () => {
            if (played) return;
            played = true;
            anim();
          };
          if (document.documentElement.classList.contains("is-ready")) play();
          else window.addEventListener("almara:ready", play, { once: true });
          return () => window.removeEventListener("almara:ready", play);
        }

        if (trigger === "scrub") {
          gsap.to(inners, {
            yPercent: 0,
            ease: "none",
            stagger: 0.12,
            scrollTrigger: { trigger: el, start: "top 90%", end: "top 35%", scrub: 0.6 },
          });
          return;
        }

        gsap.to(inners, {
          yPercent: 0,
          duration: DUR.content + 0.15,
          ease: EASE.reveal,
          stagger,
          delay,
          scrollTrigger: { trigger: el, start, once: true },
        });
      });

      mm.add(MQ.reduced, () => {
        gsap.set(inners, { y: 0, yPercent: 0 });
      });
    },
    { scope: ref, dependencies: [trigger], revertOnUpdate: true }
  );

  return (
    <Tag ref={ref} className={`split ${className}`} id={id}>
      {lines.map((line, i) => (
        <span className={`split-line ${lineClassName}`} key={i}>
          <span className="split-line__inner">{line}</span>
        </span>
      ))}
    </Tag>
  );
}
