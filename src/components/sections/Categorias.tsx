"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { categorias, productosDeCategoria, precio, precioDesde } from "@/data/catalog";
import Reveal from "@/components/core/Reveal";
import SplitLines from "@/components/core/SplitLines";
import Eyebrow from "@/components/core/Eyebrow";
import Rule from "@/components/core/Rule";
import { Arrow } from "@/components/core/CtaButton";

/**
 * Las cuatro familias del catálogo como índice, no como rejilla de tarjetas.
 *
 * En escritorio es una lista tipográfica con una única ventana fotográfica al lado: la foto
 * cambia (fundido + leve escala) con la fila bajo el cursor o con el foco del teclado. En táctil
 * no existe el hover, así que cada fila lleva su propia miniatura y no depende de él.
 */
export default function Categorias() {
  const [activa, setActiva] = useState(0);

  return (
    <section className="cats" id="categorias" data-nav-theme="light">
      <div className="container cats__grid">
        <div className="cats__head">
          <Reveal y={10}>
            <Eyebrow index="01">La tienda</Eyebrow>
          </Reveal>
          <SplitLines as="h2" className="h2 cats__title" lines={["Empieza por donde", "te haga falta."]} />
          <Reveal delay={0.12} y={0} className="cats__intro">
            <p>
              El colchón manda, pero la base y la ropa de cama deciden cómo se siente. Aquí está todo lo que compone
              una cama que funciona.
            </p>
          </Reveal>
        </div>

        <div className="cats__visor" aria-hidden="true">
          {categorias.map((c, i) => (
            <div key={c.id} className={`cats__foto${i === activa ? " is-activa" : ""}`}>
              <Image src={c.imagen.src} alt="" fill sizes="(max-width: 1023px) 0px, 38vw" quality={78} />
            </div>
          ))}
          <span className="cats__visor-n label">
            0{activa + 1} / 0{categorias.length}
          </span>
        </div>

        <ul className="cats__lista">
          {categorias.map((c, i) => {
            const lista = productosDeCategoria(c.id);
            const desde = Math.min(...lista.map(precioDesde));
            return (
              <li key={c.id} className={`cat${i === activa ? " is-activa" : ""}`}>
                <Rule delay={i * 0.06} />
                <Link
                  href={`/tienda/?categoria=${c.id}`}
                  className="cat__link"
                  onMouseEnter={() => setActiva(i)}
                  onFocus={() => setActiva(i)}
                >
                  <span className="cat__thumb">
                    <Image src={c.imagen.src} alt={c.imagen.alt} fill sizes="(max-width: 1023px) 30vw, 0px" quality={74} />
                  </span>
                  <span className="cat__n label" aria-hidden="true">
                    0{i + 1}
                  </span>
                  <span className="cat__cuerpo">
                    <span className="cat__nombre">{c.nombre}</span>
                    <span className="cat__resumen">{c.resumen}</span>
                  </span>
                  <span className="cat__meta num">
                    <span>
                      {lista.length} {lista.length === 1 ? "producto" : "productos"}
                    </span>
                    <span>desde {precio(desde)}</span>
                  </span>
                  <span className="cat__flecha" aria-hidden="true">
                    <Arrow />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
