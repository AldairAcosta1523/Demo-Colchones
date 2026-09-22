"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState, type ReactNode } from "react";
import { costoEnvio, productoPorSlug, type Producto, type Variante } from "@/data/catalog";

/**
 * Estado del carrito.
 *
 * Guarda lo mínimo —slug, variante y cantidad— y resuelve el resto contra el catálogo en cada
 * render. Así un cambio de precio o de stock se refleja solo, y lo guardado no se queda obsoleto.
 *
 * Persiste en `localStorage`, pero el primer render del cliente es igual que el del servidor
 * (carrito vacío) y la restauración ocurre en un efecto: sin desajustes de hidratación.
 */

export type LineaGuardada = { slug: string; varianteId: string; cantidad: number };

export type Linea = LineaGuardada & {
  producto: Producto;
  variante: Variante;
  /** precio × cantidad */
  importe: number;
  /** La cantidad está por encima del stock disponible. */
  excedeStock: boolean;
};

type Accion =
  | { tipo: "restaurar"; lineas: LineaGuardada[] }
  | { tipo: "añadir"; slug: string; varianteId: string; cantidad: number }
  | { tipo: "cantidad"; slug: string; varianteId: string; cantidad: number }
  | { tipo: "quitar"; slug: string; varianteId: string }
  | { tipo: "vaciar" };

const CLAVE = "almara:carrito";
const MAX_POR_LINEA = 10;

function reducer(estado: LineaGuardada[], accion: Accion): LineaGuardada[] {
  switch (accion.tipo) {
    case "restaurar":
      return accion.lineas;
    case "añadir": {
      const i = estado.findIndex((l) => l.slug === accion.slug && l.varianteId === accion.varianteId);
      if (i === -1) return [...estado, { slug: accion.slug, varianteId: accion.varianteId, cantidad: accion.cantidad }];
      const copia = [...estado];
      copia[i] = { ...copia[i], cantidad: Math.min(MAX_POR_LINEA, copia[i].cantidad + accion.cantidad) };
      return copia;
    }
    case "cantidad": {
      if (accion.cantidad <= 0) {
        return estado.filter((l) => !(l.slug === accion.slug && l.varianteId === accion.varianteId));
      }
      return estado.map((l) =>
        l.slug === accion.slug && l.varianteId === accion.varianteId
          ? { ...l, cantidad: Math.min(MAX_POR_LINEA, accion.cantidad) }
          : l
      );
    }
    case "quitar":
      return estado.filter((l) => !(l.slug === accion.slug && l.varianteId === accion.varianteId));
    case "vaciar":
      return [];
  }
}

type Contexto = {
  lineas: Linea[];
  unidades: number;
  subtotal: number;
  envio: number;
  total: number;
  /** El carrito ya se restauró desde el almacenamiento del navegador. */
  listo: boolean;
  añadir: (slug: string, varianteId: string, cantidad?: number) => void;
  cambiarCantidad: (slug: string, varianteId: string, cantidad: number) => void;
  quitar: (slug: string, varianteId: string) => void;
  vaciar: () => void;
  /** Panel lateral (el Sheet de shadcn: `abrirCerrar` es su `onOpenChange`). */
  abierto: boolean;
  abrir: () => void;
  cerrar: () => void;
  abrirCerrar: (v: boolean) => void;
};

const CarritoCtx = createContext<Contexto | null>(null);

function leerGuardado(): LineaGuardada[] {
  try {
    const crudo = localStorage.getItem(CLAVE);
    if (!crudo) return [];
    const datos: unknown = JSON.parse(crudo);
    if (!Array.isArray(datos)) return [];
    // Se descarta lo que ya no exista en el catálogo en vez de arrastrar basura.
    return datos.filter((l): l is LineaGuardada => {
      if (typeof l !== "object" || l === null) return false;
      const { slug, varianteId, cantidad } = l as LineaGuardada;
      if (typeof slug !== "string" || typeof varianteId !== "string" || typeof cantidad !== "number") return false;
      const p = productoPorSlug(slug);
      return !!p && p.variantes.some((v) => v.id === varianteId) && cantidad > 0;
    });
  } catch {
    return [];
  }
}

export function CarritoProvider({ children }: { children: ReactNode }) {
  const [guardadas, despachar] = useReducer(reducer, [] as LineaGuardada[]);
  const [listo, setListo] = useState(false);
  const [abierto, setAbierto] = useState(false);

  useEffect(() => {
    despachar({ tipo: "restaurar", lineas: leerGuardado() });
    setListo(true);
  }, []);

  useEffect(() => {
    if (!listo) return;
    try {
      localStorage.setItem(CLAVE, JSON.stringify(guardadas));
    } catch {
      /* almacenamiento bloqueado: el carrito sigue funcionando en memoria */
    }
  }, [guardadas, listo]);

  // Radix bloquea el scroll nativo del Sheet; Lenis va por su cuenta y hay que pararlo aquí.
  useEffect(() => {
    document.documentElement.classList.toggle("carrito-abierto", abierto);
    if (abierto) window.__lenis?.stop();
    else window.__lenis?.start();
    return () => {
      document.documentElement.classList.remove("carrito-abierto");
      window.__lenis?.start();
    };
  }, [abierto]);

  const lineas = useMemo<Linea[]>(() => {
    return guardadas.flatMap((l) => {
      const producto = productoPorSlug(l.slug);
      const variante = producto?.variantes.find((v) => v.id === l.varianteId);
      if (!producto || !variante) return [];
      return [
        {
          ...l,
          producto,
          variante,
          importe: variante.precio * l.cantidad,
          excedeStock: l.cantidad > variante.stock,
        },
      ];
    });
  }, [guardadas]);

  const subtotal = useMemo(() => lineas.reduce((a, l) => a + l.importe, 0), [lineas]);
  const unidades = useMemo(() => lineas.reduce((a, l) => a + l.cantidad, 0), [lineas]);
  const envio = costoEnvio(subtotal);

  const añadir = useCallback((slug: string, varianteId: string, cantidad = 1) => {
    despachar({ tipo: "añadir", slug, varianteId, cantidad });
    setAbierto(true);
  }, []);

  const valor: Contexto = {
    lineas,
    unidades,
    subtotal,
    envio,
    total: subtotal + envio,
    listo,
    añadir,
    cambiarCantidad: useCallback((slug, varianteId, cantidad) => despachar({ tipo: "cantidad", slug, varianteId, cantidad }), []),
    quitar: useCallback((slug, varianteId) => despachar({ tipo: "quitar", slug, varianteId }), []),
    vaciar: useCallback(() => despachar({ tipo: "vaciar" }), []),
    abierto,
    abrir: useCallback(() => setAbierto(true), []),
    cerrar: useCallback(() => setAbierto(false), []),
    abrirCerrar: useCallback((v: boolean) => setAbierto(v), []),
  };

  return <CarritoCtx.Provider value={valor}>{children}</CarritoCtx.Provider>;
}

export function useCarrito() {
  const ctx = useContext(CarritoCtx);
  if (!ctx) throw new Error("useCarrito debe usarse dentro de <CarritoProvider>");
  return ctx;
}
