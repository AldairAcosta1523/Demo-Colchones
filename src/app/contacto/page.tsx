import type { Metadata } from "next";
import Consulta from "@/components/sections/Consulta";
import Reveal from "@/components/core/Reveal";
import SplitLines from "@/components/core/SplitLines";
import Eyebrow from "@/components/core/Eyebrow";
import { contactoPagina } from "@/data/tienda";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Escríbenos antes de comprar si dudas entre dos firmezas o no sabes qué medida necesitas.",
  alternates: { canonical: `${SITE_URL}/contacto/` },
};

export default function ContactoPage() {
  return (
    <>
      <section className="contacto" data-nav-theme="light">
        <div className="container contacto__grid">
          <div>
            <Reveal>
              <Eyebrow>Contacto</Eyebrow>
            </Reveal>
            <SplitLines
              as="h1"
              className="h2"
              lines={[contactoPagina.titulo[0], <span className="accent" key="a">{contactoPagina.titulo[1]}</span>]}
            />
            <Reveal delay={0.16} className="contacto__intro">
              <p className="lead">{contactoPagina.intro}</p>
            </Reveal>
          </div>

          <Reveal delay={0.1} as="dl" className="contacto__canales">
            {contactoPagina.canales.map((c) => (
              <div key={c.k}>
                <dt className="label">{c.k}</dt>
                <dd>
                  {c.v}
                  <span className="contacto__nota">{c.nota}</span>
                </dd>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <Consulta />
    </>
  );
}
