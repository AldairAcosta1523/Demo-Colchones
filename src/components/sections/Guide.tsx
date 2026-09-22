"use client";

import { useRef } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";
import { EASE } from "@/lib/motion";
import { guide } from "@/data/content";
import Reveal from "@/components/core/Reveal";
import SplitLines from "@/components/core/SplitLines";
import Eyebrow from "@/components/core/Eyebrow";
import Rule from "@/components/core/Rule";
import { Arrow, onAnchorClick } from "@/components/core/CtaButton";

/**
 * Cómo elegir: el gran contraste de la página.
 *
 * La entrada al fondo espresso se resuelve con un velo del color claro anterior que se retira
 * hacia abajo mientras la sección sube. El velo solo existe cuando hay JS y movimiento: por
 * defecto está retraído, así que sin animación no tapa nada ni provoca destellos.
 */
export default function Guide() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();

      mm.add(MQ.motion, () => {
        gsap.fromTo(
          ".guide__veil",
          { scaleY: 1 },
          {
            scaleY: 0,
            ease: EASE.scrub,
            scrollTrigger: { trigger: el, start: "top bottom", end: "top 52%", scrub: 0.4 },
          }
        );
      });
    },
    { scope: ref }
  );

  return (
    <section ref={ref} className="guide" id="guia" data-nav-theme="dark">
      <span className="guide__veil" aria-hidden="true" />
      <div className="container">
        <div className="guide__head">
          <div className="guide__titulo">
            <Reveal y={10}>
              <Eyebrow className="eyebrow--light" index="07">
                {guide.eyebrow}
              </Eyebrow>
            </Reveal>
            <SplitLines as="h2" className="display guide__title" lines={[guide.title[0], guide.title[1]]} />
          </div>
          <Reveal delay={0.12} y={0} className="guide__intro">
            <p className="lead">{guide.intro}</p>
          </Reveal>
        </div>

        <ol className="guide__steps">
          {guide.steps.map((s, i) => (
            <li key={s.n} className="step">
              <Rule light delay={i * 0.08} className="step__rule" />
              <Reveal delay={0.08 + i * 0.08} y={18} className="step__inner">
                <span className="step__n" aria-hidden="true">
                  {s.n}
                </span>
                <h3 className="h3 step__title">{s.title}</h3>
                <p className="step__text">{s.text}</p>
                <p className="step__hint">{s.hint}</p>
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal y={12} className="guide__pie">
          <p>¿Sigues dudando entre dos?</p>
          <a href="#comparativa" className="arrow-link" onClick={(e) => onAnchorClick(e, "#comparativa")}>
            Compáralos lado a lado
            <Arrow />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
