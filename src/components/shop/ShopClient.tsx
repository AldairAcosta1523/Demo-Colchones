"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal } from "lucide-react";
import {
  categorias,
  precio,
  precioDesde,
  productos,
  type CategoriaId,
  type Producto,
} from "@/data/catalog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import ProductCard from "./ProductCard";

type Orden = "recomendado" | "precio-asc" | "precio-desc" | "nombre";

const ORDENES: { id: Orden; nombre: string }[] = [
  { id: "recomendado", nombre: "Recomendado" },
  { id: "precio-asc", nombre: "Precio: menor primero" },
  { id: "precio-desc", nombre: "Precio: mayor primero" },
  { id: "nombre", nombre: "Nombre (A–Z)" },
];

/** Medidas presentes en el catálogo, en el orden en que aparecen. */
const MEDIDAS = Array.from(new Set(productos.flatMap((p) => p.variantes.map((v) => v.nombre))));
const FIRMEZAS = Array.from(new Set(productos.map((p) => p.firmeza).filter(Boolean))) as string[];
const PRECIO_MAX = Math.max(...productos.flatMap((p) => p.variantes.map((v) => v.precio)));
const PRECIO_MIN = Math.min(...productos.flatMap((p) => p.variantes.map((v) => v.precio)));

const normalizar = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");

export default function ShopClient() {
  const params = useSearchParams();
  const categoriaInicial = params.get("categoria") as CategoriaId | null;

  const [cats, setCats] = useState<CategoriaId[]>(
    categoriaInicial && categorias.some((c) => c.id === categoriaInicial) ? [categoriaInicial] : []
  );
  const [firmezas, setFirmezas] = useState<string[]>([]);
  const [medidas, setMedidas] = useState<string[]>([]);
  const [tope, setTope] = useState(PRECIO_MAX);
  const [busqueda, setBusqueda] = useState("");
  const [orden, setOrden] = useState<Orden>("recomendado");
  const [panelAbierto, setPanelAbierto] = useState(false);

  const alternar = <T,>(lista: T[], valor: T, set: (v: T[]) => void) =>
    set(lista.includes(valor) ? lista.filter((x) => x !== valor) : [...lista, valor]);

  const activos = cats.length + firmezas.length + medidas.length + (tope < PRECIO_MAX ? 1 : 0) + (busqueda ? 1 : 0);

  const limpiar = () => {
    setCats([]);
    setFirmezas([]);
    setMedidas([]);
    setTope(PRECIO_MAX);
    setBusqueda("");
  };

  const resultados = useMemo(() => {
    const q = normalizar(busqueda.trim());
    const filtrados = productos.filter((p: Producto) => {
      if (cats.length && !cats.includes(p.categoria)) return false;
      if (firmezas.length && (!p.firmeza || !firmezas.includes(p.firmeza))) return false;
      if (medidas.length && !p.variantes.some((v) => medidas.includes(v.nombre))) return false;
      if (precioDesde(p) > tope) return false;
      if (q) {
        const heno = normalizar(`${p.nombre} ${p.resumen} ${p.descripcion} ${p.beneficios.join(" ")}`);
        if (!q.split(/\s+/).every((t) => heno.includes(t))) return false;
      }
      return true;
    });

    const ordenados = [...filtrados];
    if (orden === "precio-asc") ordenados.sort((a, b) => precioDesde(a) - precioDesde(b));
    else if (orden === "precio-desc") ordenados.sort((a, b) => precioDesde(b) - precioDesde(a));
    else if (orden === "nombre") ordenados.sort((a, b) => a.nombre.localeCompare(b.nombre, "es"));
    else ordenados.sort((a, b) => a.orden - b.orden);
    return ordenados;
  }, [cats, firmezas, medidas, tope, busqueda, orden]);

  /**
   * Los filtros se pintan dos veces —columna en escritorio, Sheet en móvil— así que cada casilla
   * necesita un id propio: `ns` evita que el <label> del panel apunte al control de la columna.
   */
  const grupoCasillas = (
    ns: string,
    titulo: string,
    opciones: { id: string; nombre: string }[],
    marcados: string[],
    onToggle: (id: string) => void
  ) => (
    <fieldset className="filtros__grupo">
      <legend className="label">{titulo}</legend>
      <div className="filtros__opciones">
        {opciones.map((o) => {
          const id = `${ns}-${titulo}-${o.id}`.replace(/\s+/g, "-").toLowerCase();
          return (
            <div key={o.id} className="filtros__opcion">
              <Checkbox id={id} checked={marcados.includes(o.id)} onCheckedChange={() => onToggle(o.id)} />
              <Label htmlFor={id}>{o.nombre}</Label>
            </div>
          );
        })}
      </div>
    </fieldset>
  );

  const filtros = (ns: string) => (
    <div className="filtros__cuerpo">
      {grupoCasillas(
        ns,
        "Categoría",
        categorias.map((c) => ({ id: c.id, nombre: c.nombre })),
        cats,
        (id) => alternar(cats, id as CategoriaId, setCats)
      )}
      {grupoCasillas(
        ns,
        "Firmeza",
        FIRMEZAS.map((f) => ({ id: f, nombre: f })),
        firmezas,
        (id) => alternar(firmezas, id, setFirmezas)
      )}
      {grupoCasillas(
        ns,
        "Medida",
        MEDIDAS.map((m) => ({ id: m, nombre: m })),
        medidas,
        (id) => alternar(medidas, id, setMedidas)
      )}

      <fieldset className="filtros__grupo">
        <legend className="label">Precio máximo</legend>
        <Slider
          className="filtros__rango"
          min={PRECIO_MIN}
          max={PRECIO_MAX}
          step={50}
          value={[tope]}
          onValueChange={([v]) => setTope(v)}
          aria-label={`Precio máximo: ${precio(tope)}`}
        />
        <p className="filtros__rango-valor">
          Hasta <strong>{precio(tope)}</strong>
        </p>
      </fieldset>

      {activos > 0 && (
        <Button type="button" variant="link" size="sm" className="filtros__limpiar" onClick={limpiar}>
          Quitar filtros ({activos})
        </Button>
      )}
    </div>
  );

  return (
    <div className="tienda__layout">
      <aside className="filtros" aria-label="Filtros">
        {filtros("col")}
      </aside>

      <div className="tienda__contenido">
        <div className="tienda__barra">
          <div className="tienda__buscar">
            <Label htmlFor="tienda-buscar" className="sr-only">
              Buscar productos
            </Label>
            <Search size={16} strokeWidth={1.7} aria-hidden="true" />
            <Input
              id="tienda-buscar"
              type="search"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar colchón, almohada, lino…"
            />
          </div>

          <div className="tienda__controles">
            <Sheet open={panelAbierto} onOpenChange={setPanelAbierto}>
              <SheetTrigger asChild>
                <Button type="button" variant="outline" className="tienda__filtros-btn">
                  <SlidersHorizontal strokeWidth={1.7} aria-hidden="true" />
                  Filtrar{activos > 0 ? ` (${activos})` : ""}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="filtros--panel" closeLabel="Cerrar los filtros">
                <SheetHeader className="filtros__head">
                  <SheetTitle className="filtros__titulo label">Filtrar</SheetTitle>
                  <SheetDescription className="sr-only">
                    Filtra el catálogo por categoría, firmeza, medida y precio
                  </SheetDescription>
                </SheetHeader>
                {filtros("panel")}
              </SheetContent>
            </Sheet>

            <div className="tienda__orden">
              <Label htmlFor="tienda-orden" className="sr-only">
                Ordenar por
              </Label>
              <Select value={orden} onValueChange={(v) => setOrden(v as Orden)}>
                <SelectTrigger id="tienda-orden">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {ORDENES.map((o) => (
                    <SelectItem key={o.id} value={o.id}>
                      {o.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <p className="tienda__cuenta" role="status" aria-live="polite">
          {resultados.length === 0
            ? "Ningún producto coincide"
            : `${resultados.length} ${resultados.length === 1 ? "producto" : "productos"}`}
          {activos > 0 && resultados.length > 0 ? " con los filtros aplicados" : ""}
        </p>

        {resultados.length === 0 ? (
          <div className="tienda__vacio">
            <p className="tienda__vacio-titulo">No encontramos nada con esa combinación.</p>
            <p>Prueba a quitar algún filtro o a buscar por otra palabra.</p>
            <Button type="button" variant="brand-secondary" size="pill" onClick={limpiar}>
              <span className="btn__label">
                <span className="btn__label-in">Quitar todos los filtros</span>
              </span>
            </Button>
          </div>
        ) : (
          <ul className="tienda__grid">
            {resultados.map((p, i) => (
              <li key={p.slug}>
                <ProductCard producto={p} prioridad={i < 3} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
