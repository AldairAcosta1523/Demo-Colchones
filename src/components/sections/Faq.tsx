"use client";

import { faq } from "@/data/content";
import Reveal from "@/components/core/Reveal";
import SplitLines from "@/components/core/SplitLines";
import Eyebrow from "@/components/core/Eyebrow";
import CtaButton from "@/components/core/CtaButton";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

/** FAQ sobre Accordion de shadcn/ui (Radix): accesible por teclado, un ítem abierto a la vez. */
export default function Faq({
  items = faq.items,
  comoTitulo1 = false,
}: {
  items?: { q: string; a: string }[];
  /** En la página dedicada el titular de la sección es el h1 del documento. */
  comoTitulo1?: boolean;
}) {
  return (
    <section className="faq" id="faq" data-nav-theme="light">
      <div className="container faq__grid">
        <div className="faq__side">
          <Reveal>
            <Eyebrow index={comoTitulo1 ? undefined : "09"}>Preguntas frecuentes</Eyebrow>
          </Reveal>
          <SplitLines
            as={comoTitulo1 ? "h1" : "h2"}
            className="h2 faq__title"
            lines={[faq.title[0], faq.title[1], faq.title[2]]}
          />
          <Reveal delay={0.3} className="faq__more">
            <p>{faq.more.title}</p>
            <CtaButton href="/contacto/" variant="secondary">
              {faq.more.cta}
            </CtaButton>
          </Reveal>
        </div>

        <Reveal className="faq__list">
          <Accordion type="single" collapsible defaultValue="faq-0">
            {items.map((item, i) => (
              <AccordionItem className="faq__item" value={`faq-${i}`} key={item.q}>
                <AccordionTrigger className="faq__q">
                  <span className="faq__n">0{i + 1}</span>
                  <span className="faq__q-text">{item.q}</span>
                  <span className="faq__icon" aria-hidden="true">
                    <span />
                    <span />
                  </span>
                </AccordionTrigger>
                <AccordionContent className="faq__a">
                  <p>{item.a}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
