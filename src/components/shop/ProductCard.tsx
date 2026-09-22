"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { agotado, precio, precioDesde, type Producto } from "@/data/catalog";
import { useCarrito } from "@/lib/cart";
import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

/**
 * Tarjeta de producto sobre el Card de shadcn.
 *
 * El añadido rápido no adivina la variante: muestra las medidas disponibles y añade la que se
 * pulse. Las agotadas se ven, pero no se pueden pulsar; así el usuario sabe que existen.
 */
export default function ProductCard({ producto, prioridad = false }: { producto: Producto; prioridad?: boolean }) {
  const { añadir } = useCarrito();
  const sinStock = agotado(producto);
  const desde = precioDesde(producto);
  const variasVariantes = producto.variantes.length > 1;
  // Confirmación en el propio control: la medida pulsada se marca un instante, además de
  // abrirse el panel del carrito.
  const [añadida, setAñadida] = useState<string | null>(null);
  const temporizador = useRef<number | null>(null);
  useEffect(() => () => void (temporizador.current && window.clearTimeout(temporizador.current)), []);
  const alAñadir = (varianteId: string) => {
    añadir(producto.slug, varianteId);
    setAñadida(varianteId);
    if (temporizador.current) window.clearTimeout(temporizador.current);
    temporizador.current = window.setTimeout(() => setAñadida(null), 1800);
  };

  return (
    <Card asChild className={`pcard${sinStock ? " is-agotado" : ""}`}>
      <article>
        <Link href={`/producto/${producto.slug}/`} className="pcard__media" data-cursor="link" tabIndex={-1} aria-hidden="true">
          <Image
            src={producto.imagen.src}
            alt=""
            fill
            sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 30vw"
            quality={78}
            priority={prioridad}
            className="pcard__img"
          />
          {producto.imagenHover && (
            <Image
              src={producto.imagenHover.src}
              alt=""
              fill
              sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 30vw"
              quality={74}
              className="pcard__img pcard__img--hover"
            />
          )}
          {sinStock && (
            <Badge variant="secondary" className="pcard__badge">
              Agotado
            </Badge>
          )}
        </Link>

        <CardContent className="pcard__body">
          <div className="pcard__cabecera">
            <h3 className="pcard__nombre">
              <Link href={`/producto/${producto.slug}/`} data-cursor="link">
                {producto.nombre}
              </Link>
            </h3>
            <p className="pcard__precio num">
              {variasVariantes && <span className="pcard__desde">desde</span>}
              <span className="pcard__importe">{precio(desde)}</span>
            </p>
          </div>
          <p className="pcard__resumen">{producto.resumen}</p>
        </CardContent>

        {!sinStock && (
          <CardFooter className="pcard__tallas">
            <span className="pcard__tallas-label label">Añadir al carrito</span>
            <div className="pcard__tallas-lista">
              {producto.variantes.map((v) => (
                <Button
                  key={v.id}
                  type="button"
                  variant="outline"
                  size="sm"
                  className={`pcard__talla${añadida === v.id ? " is-añadida" : ""}`}
                  disabled={v.stock === 0}
                  onClick={() => alAñadir(v.id)}
                  aria-label={
                    v.stock === 0
                      ? `${v.nombre}, agotada`
                      : `Añadir ${producto.nombre}, ${v.nombre}, ${precio(v.precio)}`
                  }
                  title={v.stock === 0 ? "Agotada" : `${v.medida} · ${precio(v.precio)}`}
                >
                  {añadida === v.id && <Check size={13} strokeWidth={2} aria-hidden="true" />}
                  {v.nombre}
                </Button>
              ))}
            </div>
            <span className="sr-only" role="status">
              {añadida ? `${producto.nombre} añadido al carrito` : ""}
            </span>
          </CardFooter>
        )}
      </article>
    </Card>
  );
}
