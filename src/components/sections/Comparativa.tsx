"use client";

import { useState, type KeyboardEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { precio, precioDesde, productosDeCategoria, type Producto } from "@/data/catalog";
import Reveal from "@/components/core/Reveal";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import SplitLines from "@/components/core/SplitLines";
import Eyebrow from "@/components/core/Eyebrow";
import Firmeza from "@/components/core/Firmeza";
import { Arrow, ButtonLabel } from "@/components/core/CtaButton";

const spec = (p: Producto, k: string) => p.especificaciones.find((e) => e.k === k)?.v ?? "—";

const FILAS: { etiqueta: string; valor: (p: Producto) => string }[] = [
  { etiqueta: "Altura", valor: (p) => p.altura ?? "—" },
  { etiqueta: "Acogida", valor: (p) => spec(p, "Acogida") },
  { etiqueta: "Tejido", valor: (p) => spec(p, "Tejido") },
  { etiqueta: "Postura", valor: (p) => spec(p, "Postura") },
  { etiqueta: "Medidas", valor: (p) => p.variantes.map((v) => v.nombre).join(" · ") },
];

function IrAlProducto({ p }: { p: Producto }) {
  return (
    <Link href={`/producto/${p.slug}/`} className="btn btn--secondary comp__btn">
      <ButtonLabel>Ver {p.nombre}</ButtonLabel>
      <Arrow />
    </Link>
  );
}

/**
 * Comparativa de los tres colchones.
 *
 * En escritorio es una tabla de verdad (tres columnas caben y comparar es leer en horizontal).
 * En móvil tres columnas no caben sin volverse ilegibles, así que se sustituye por un selector
 * de producto con pestañas: una ficha completa cada vez, con los mismos datos y en el mismo orden.
 */
export default function Comparativa() {
  const colchones = productosDeCategoria("colchones");
  const [sel, setSel] = useState(0);
  const actual = colchones[sel];

  const alTeclearPestaña = (e: KeyboardEvent<HTMLDivElement>) => {
    const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const next = (sel + d + colchones.length) % colchones.length;
    setSel(next);
    e.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]')[next]?.focus();
  };

  return (
    <section className="comp" id="comparativa" data-nav-theme="light">
      <div className="container">
        <div className="comp__head">
          <div className="comp__titulo">
            <Reveal y={10}>
              <Eyebrow index="08">Comparativa</Eyebrow>
            </Reveal>
            <SplitLines as="h2" className="h2" lines={["Los tres, uno", "al lado del otro."]} />
          </div>
          <Reveal delay={0.12} y={0} className="comp__intro">
            <p className="lead">La diferencia no es de calidad, es de sensación. Elige por cómo quieres que se sienta.</p>
          </Reveal>
        </div>

        {/* Escritorio y tablet: tabla */}
        <Reveal y={18} className="comp__escritorio">
          <Table className="comp__tabla">
            <TableCaption className="sr-only">Comparación de los tres colchones Almara</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead scope="col">
                  <span className="sr-only">Característica</span>
                </TableHead>
                {colchones.map((c, i) => (
                  <TableHead key={c.slug} scope="col" className="comp__col">
                    <Link href={`/producto/${c.slug}/`} className="comp__ficha" data-cursor="link">
                      <span className="comp__foto">
                        <Image src={c.imagen.src} alt="" fill sizes="(max-width: 767px) 0px, 26vw" quality={76} />
                      </span>
                      <span className="label comp__n">Nº 0{i + 1}</span>
                      <span className="comp__modelo">{c.nombre}</span>
                      <span className="comp__modelo-nota">{c.resumen}</span>
                    </Link>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableHead scope="row">Desde</TableHead>
                {colchones.map((c) => (
                  <TableCell key={c.slug} className="comp__precio num">
                    {precio(precioDesde(c))}
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableHead scope="row">Firmeza</TableHead>
                {colchones.map((c) => (
                  <TableCell key={c.slug}>
                    <span className="comp__firmeza">
                      {c.firmeza ?? "—"}
                      {c.firmeza && <Firmeza valor={c.firmeza} />}
                    </span>
                  </TableCell>
                ))}
              </TableRow>
              {FILAS.map((f) => (
                <TableRow key={f.etiqueta}>
                  <TableHead scope="row">{f.etiqueta}</TableHead>
                  {colchones.map((c) => (
                    <TableCell key={c.slug}>{f.valor(c)}</TableCell>
                  ))}
                </TableRow>
              ))}
              <TableRow className="comp__acciones">
                <TableHead scope="row">
                  <span className="sr-only">Ir al producto</span>
                </TableHead>
                {colchones.map((c) => (
                  <TableCell key={c.slug}>
                    <IrAlProducto p={c} />
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </Reveal>

        {/* Móvil: selector de producto */}
        <div className="comp__movil">
          <div className="comp__tabs" role="tablist" aria-label="Elige un colchón" onKeyDown={alTeclearPestaña} style={{ ["--i" as string]: sel, ["--n" as string]: colchones.length }}>
            <span className="comp__tabs-marca" aria-hidden="true" />
            {colchones.map((c, i) => (
              <button
                key={c.slug}
                type="button"
                role="tab"
                id={`comp-tab-${c.slug}`}
                aria-selected={sel === i}
                aria-controls="comp-panel"
                tabIndex={sel === i ? 0 : -1}
                className={`comp__tab${sel === i ? " is-activa" : ""}`}
                onClick={() => setSel(i)}
              >
                {c.nombre}
              </button>
            ))}
          </div>

          <div className="comp__panel" role="tabpanel" id="comp-panel" aria-labelledby={`comp-tab-${actual.slug}`} key={actual.slug}>
            <div className="comp__panel-foto">
              <Image src={actual.imagen.src} alt={actual.imagen.alt} fill sizes="(max-width: 767px) 100vw, 0px" quality={76} />
            </div>
            <div className="comp__panel-cabecera">
              <h3 className="comp__modelo">{actual.nombre}</h3>
              <p className="comp__precio num">
                <span>desde</span> {precio(precioDesde(actual))}
              </p>
            </div>
            <p className="comp__modelo-nota">{actual.resumen}</p>
            <dl className="comp__datos">
              <div>
                <dt>Firmeza</dt>
                <dd>
                  <span className="comp__firmeza">
                    {actual.firmeza ?? "—"}
                    {actual.firmeza && <Firmeza valor={actual.firmeza} />}
                  </span>
                </dd>
              </div>
              {FILAS.map((f) => (
                <div key={f.etiqueta}>
                  <dt>{f.etiqueta}</dt>
                  <dd>{f.valor(actual)}</dd>
                </div>
              ))}
            </dl>
            <IrAlProducto p={actual} />
          </div>
        </div>
      </div>
    </section>
  );
}
